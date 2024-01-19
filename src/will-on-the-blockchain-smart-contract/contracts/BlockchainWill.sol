// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

// ====== Errors ======
error UnderAge(string citizenshipCardId);
error HasCreatedWill(string citizenshipCardId);
error HasNotCreatedWill(string citizenshipCardId);
error NotTestator(address sender);
error PrivateWill();
error PublicWill();

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
        string secretCode;
        Person testator;
        Person firstWitness;
        Person secondWitness;
    }

    struct Person {
        string name;
        string citizenshipCardId;
        uint256 birthdate;
    }

    struct WillCreation {
        string will;
        bool isPublic;
        string secretCode;
        Person testator;
        Person firstWitness;
        Person secondWitness;
    }

    // ====== Storage Variables ======
    // Mapping to store the citizenship card ID associated with each will
    mapping(string => Will) public citizenshipCardIdToWill;
    // Mapping to store if a person has created a will
    mapping(string => bool) public personHasCreatedWill;
    // Mapping to store the address associated with each citizenship card ID
    mapping(string => address) public citizenshipCardIdToAddress;
    // Array to store the public wills
    Will[] public publicWills;

    // ====== Public Functions ======

    function createWill(WillCreation memory _will) public {
        if (personHasCreatedWill[_will.testator.citizenshipCardId]) {
            revert HasCreatedWill(_will.testator.citizenshipCardId);
        }

        if (!isAdult(_will.testator.birthdate)) {
            revert UnderAge(_will.testator.name);
        }

        if (!isAdult(_will.firstWitness.birthdate)) {
            revert UnderAge(_will.firstWitness.name);
        }

        if (!isAdult(_will.secondWitness.birthdate)) {
            revert UnderAge(_will.secondWitness.name);
        }

        Will memory newWill = Will({
            will: _will.will,
            isPublic: _will.isPublic,
            createdAt: block.timestamp, // Current timestamp in seconds since the Unix epoch
            secretCode: _will.secretCode, // Secret code to be used to revoke a will or to see the details of a private will
            testator: createPerson(
                _will.testator.name,
                _will.testator.citizenshipCardId,
                _will.testator.birthdate
            ),
            firstWitness: createPerson(
                _will.firstWitness.name,
                _will.firstWitness.citizenshipCardId,
                _will.firstWitness.birthdate
            ),
            secondWitness: createPerson(
                _will.secondWitness.name,
                _will.secondWitness.citizenshipCardId,
                _will.secondWitness.birthdate
            )
        });

        // Store the will in the mapping between citizenship card ID and will
        citizenshipCardIdToWill[_will.testator.citizenshipCardId] = newWill;

        // Set the testator as having a will
        personHasCreatedWill[_will.testator.citizenshipCardId] = true;

        // Store the mapping between citizenship card ID and sender's address
        citizenshipCardIdToAddress[_will.testator.citizenshipCardId] = msg
            .sender;

        if (_will.isPublic) {
            publicWills.push(newWill);
        }
    }

    function createPerson(
        string memory _name,
        string memory _citizenshipId,
        uint _birthdate
    ) private pure returns (Person memory) {
        return
            Person({
                name: _name,
                birthdate: _birthdate,
                citizenshipCardId: _citizenshipId
            });
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
        return citizenshipCardIdToWill[_testatorCitizenshipCardId];
    }

    /**
     * @dev Allows the testator to revoke his will if it's public.
     * @param _testatorCitizenshipCardId The citizenship card id of the testator.
     */
    function revokePublicWill(string memory _testatorCitizenshipCardId) public {
        // Check if the sender is the testator
        if (
            msg.sender != citizenshipCardIdToAddress[_testatorCitizenshipCardId]
        ) {
            revert NotTestator(msg.sender);
        }

        // Check if the testator has a will
        if (!personHasCreatedWill[_testatorCitizenshipCardId]) {
            revert HasNotCreatedWill(_testatorCitizenshipCardId);
        }

        // Check if the will is public
        if (!citizenshipCardIdToWill[_testatorCitizenshipCardId].isPublic) {
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
                delete citizenshipCardIdToWill[_testatorCitizenshipCardId];

                // Detete the address from the mapping
                delete citizenshipCardIdToAddress[_testatorCitizenshipCardId];

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
    function revokePrivateWill(
        string memory _testatorCitizenshipCardId
    ) public {
        // Check if the sender is the testator
        if (
            msg.sender != citizenshipCardIdToAddress[_testatorCitizenshipCardId]
        ) {
            revert NotTestator(msg.sender);
        }

        // Check if the will is public
        if (citizenshipCardIdToWill[_testatorCitizenshipCardId].isPublic) {
            revert PublicWill();
        }

        // Check if the testator has a will
        if (!personHasCreatedWill[_testatorCitizenshipCardId]) {
            revert HasNotCreatedWill(_testatorCitizenshipCardId);
        }

        // Delete the will from the mapping
        delete citizenshipCardIdToWill[_testatorCitizenshipCardId];

        // Detete the address from the mapping
        delete citizenshipCardIdToAddress[_testatorCitizenshipCardId];

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
