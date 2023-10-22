// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

// ====== Errors ======
error UnderAge(string personName);
error HasCreatedWill(string personName);

contract BlockchainWill {
    // ====== Structs ======
    struct Will {
        string will;
        bool isPublic;
        Person testator;
        Person firstWitness;
        Person secondWitness;
    }

    struct Person {
        string name;
        string citizenshipCardId;
        uint birthdate;
    }

    // ====== Storage Variables ======
    mapping(string => Will) public userCitizenshipCardIdToWill;
    mapping(string => bool) public personHasCreatedWill;
    Will[] public wills;
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
        // TODO: Add verification to check if Testator as already created a will by checking it's citizenship card id. Or just simply replace the values????
        //Better return the HasCreatedWill error if the person has already created a will, then the frontend can display a message to the user to redo the will

        // TODO: Add method to replace the will of a person if he has already created one
        if (personHasCreatedWill[_testatorCitizenshipCardId]) {
            revert HasCreatedWill(_author);
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

    function getWills() public view returns (Will[] memory) {
        return wills;
    }

    function getWillsLength() public view returns (uint) {
        return wills.length;
    }

    function getPublicWillsLength() public view returns (uint) {
        return publicWills.length;
    }

    function getPublicWills() public view returns (Will[] memory) {
        return publicWills;
    }

    function redoWill(string memory _testatorCitizenshipCardId) public {
        require(
            personHasCreatedWill[_testatorCitizenshipCardId],
            "No will exists for this person"
        );

        personHasCreatedWill[_testatorCitizenshipCardId] = false; // Allow the person to redo the will
    }

    // ====== Private Functions ======

    /// @dev Checks if the person is an adult
    /// @param birthdate Birthdate of the person in seconds since the Unix epoch
    /// @return True if the person is an adult, false otherwise
    function isAdult(uint256 birthdate) private view returns (bool) {
        uint256 currentTime = block.timestamp; // Current timestamp in seconds since the Unix epoch
        uint256 secondsInYear = 31536000; // 60 * 60 * 24 * 365

        uint256 age = (currentTime - birthdate) / secondsInYear;

        return age >= 18;
    }
}
