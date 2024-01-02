// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

// ====== Errors ======
error UnderAge(string citizenshipCardId);
error HasCreatedWill(string citizenshipCardId);
error HasNotCreatedWill(string citizenshipCardId);
error PrivateWill();

/**
 * @title BlockchainWill
 * @author Mário Viana
 * @dev This contract allows people to create wills on the blockchain
 * @notice This contract is not audited, it's only for a basic simulation so use at your own risk
 * @custom:experimental This is an experimental contract
 */
contract BlockchainWill {
    // ====== Structs ======
    struct Will {
        string will;
        bool isPublic;
        uint256 createdAt;
        Person testator;
        Person firstWitness;
        Person secondWitness;
    }

    struct Person {
        string name;
        string citizenshipCardId;
        uint256 birthdate;
    }

    // ====== Storage Variables ======
    mapping(string => Will) public userCitizenshipCardIdToWill;
    mapping(string => bool) public personHasCreatedWill;
    Will[] public publicWills;

    // ====== Public Functions ======
    function createWill(
        string memory _author,
        string memory _will,
        string memory _testatorCitizenshipCardId,
        uint256 _testatorBirthdate,
        bool _isPublic,
        string memory _firstWitnessName,
        string memory _firstWitnessCitizenshipCardId,
        uint _firstWitnessBirthdate,
        string memory _secondWitnessName,
        string memory _secondWitnessCitizenshipCardId,
        uint _secondWitnessBirthdate
    ) public {
        if (personHasCreatedWill[_testatorCitizenshipCardId]) {
            revert HasCreatedWill(_testatorCitizenshipCardId);
        }

        if (!isAdult(_testatorBirthdate)) {
            revert UnderAge(_author);
        }

        if (!isAdult(_firstWitnessBirthdate)) {
            revert UnderAge(_firstWitnessName);
        }

        if (!isAdult(_secondWitnessBirthdate)) {
            revert UnderAge(_secondWitnessName);
        }

        Will memory newWill = Will({
            will: _will,
            isPublic: _isPublic,
            createdAt: block.timestamp, // Current timestamp in seconds since the Unix epoch
            testator: Person({ // Data for the testator
                name: _author,
                citizenshipCardId: _testatorCitizenshipCardId,
                birthdate: _testatorBirthdate
            }),
            firstWitness: Person({ // Data for the first witness
                name: _firstWitnessName,
                citizenshipCardId: _firstWitnessCitizenshipCardId,
                birthdate: _firstWitnessBirthdate
            }),
            secondWitness: Person({ // Data for the second witness
                name: _secondWitnessName,
                citizenshipCardId: _secondWitnessCitizenshipCardId,
                birthdate: _secondWitnessBirthdate
            })
        });

        userCitizenshipCardIdToWill[_testatorCitizenshipCardId] = newWill;
        personHasCreatedWill[_testatorCitizenshipCardId] = true;

        if (_isPublic) {
            publicWills.push(newWill);
        }
    }

    /**
     * @dev Returns the public wills length.
     * @notice Returns the public wills length.
     * @return uint Length of the public wills.
     */
    function getPublicWillsLength() public view returns (uint) {
        return publicWills.length;
    }

    /**
     * @dev Returns the public wills.
     * @return Will[] Array of public wills.
     */
    function getPublicWills() public view returns (Will[] memory) {
        return publicWills;
    }

    /**
     * @dev Returns the will of a person.
     * @param _testatorCitizenshipCardId The citizenship card id of the testator.
     * @return Will The will of the person.
     */
    function getWill(
        string memory _testatorCitizenshipCardId
    ) public view returns (Will memory) {
        if (!personHasCreatedWill[_testatorCitizenshipCardId]) {
            revert HasNotCreatedWill(_testatorCitizenshipCardId);
        }
        return userCitizenshipCardIdToWill[_testatorCitizenshipCardId];
    }

    /**
     * @dev Allows the testator to revoke his will if it's public.
     * @param _testatorCitizenshipCardId The citizenship card id of the testator.
     */
    function revokePublicWill(string memory _testatorCitizenshipCardId) public {
        if (!personHasCreatedWill[_testatorCitizenshipCardId]) {
            revert HasNotCreatedWill(_testatorCitizenshipCardId);
        }

        if (!userCitizenshipCardIdToWill[_testatorCitizenshipCardId].isPublic) {
            revert PrivateWill();
        }

        for (uint i = 0; i < publicWills.length; i++) {
            // If the testator is found
            if (
                keccak256(
                    abi.encodePacked(publicWills[i].testator.citizenshipCardId)
                ) == keccak256(abi.encodePacked(_testatorCitizenshipCardId))
            ) {
                // Swap with the last element
                publicWills[i] = publicWills[publicWills.length - 1];

                // Reduce the array length
                publicWills.pop();

                // Delete the will from the mapping
                delete userCitizenshipCardIdToWill[_testatorCitizenshipCardId];

                // Set the testator as not having a will
                personHasCreatedWill[_testatorCitizenshipCardId] = false;
                break;
            }
        }
    }

    /**
     * @dev Allows the testator to revoke his will.
     * @param _testatorCitizenshipCardId The citizenship card id of the testator.
     */
    function revokeWill(string memory _testatorCitizenshipCardId) public {
        if (!personHasCreatedWill[_testatorCitizenshipCardId]) {
            revert HasNotCreatedWill(_testatorCitizenshipCardId);
        }

        delete userCitizenshipCardIdToWill[_testatorCitizenshipCardId];

        // Set the testator as not having a will
        personHasCreatedWill[_testatorCitizenshipCardId] = false;
    }

    // ====== Private Functions ======

    /**
     * @dev Checks if the person is an adult.
     * @param birthdate Birthdate of the person in seconds since the Unix epoch.
     * @return True if the person is an adult, false otherwise.
     */
    function isAdult(uint256 birthdate) private view returns (bool) {
        uint256 currentTime = block.timestamp; // Current timestamp in seconds since the Unix epoch
        uint256 secondsInYear = 31536000; // 60 * 60 * 24 * 365

        uint256 age = (currentTime - birthdate) / secondsInYear;

        return age >= 18;
    }
}
