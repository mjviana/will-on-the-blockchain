/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type {
  BlockchainWill,
  BlockchainWillInterface,
} from "../BlockchainWill";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "personName",
        type: "string",
      },
    ],
    name: "HasCreatedWill",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "personName",
        type: "string",
      },
    ],
    name: "UnderAge",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_author",
        type: "string",
      },
      {
        internalType: "string",
        name: "_will",
        type: "string",
      },
      {
        internalType: "string",
        name: "_testatorCitizenshipCardId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_testatorBirthdate",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isPublic",
        type: "bool",
      },
      {
        internalType: "string",
        name: "_firstWitnessName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_firstWitnessCitizenshipCardId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_firstWitnessBirthdate",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_secondWitnessName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_secondWitnessCitizenshipCardId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_secondWitnessBirthdate",
        type: "uint256",
      },
    ],
    name: "createWill",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPublicWills",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "will",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isPublic",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "citizenshipCardId",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "birthdate",
                type: "uint256",
              },
            ],
            internalType: "struct BlockchainWill.Person",
            name: "testator",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "citizenshipCardId",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "birthdate",
                type: "uint256",
              },
            ],
            internalType: "struct BlockchainWill.Person",
            name: "firstWitness",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "citizenshipCardId",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "birthdate",
                type: "uint256",
              },
            ],
            internalType: "struct BlockchainWill.Person",
            name: "secondWitness",
            type: "tuple",
          },
        ],
        internalType: "struct BlockchainWill.Will[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPublicWillsLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_testatorCitizenshipCardId",
        type: "string",
      },
    ],
    name: "getWill",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "will",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isPublic",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "citizenshipCardId",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "birthdate",
                type: "uint256",
              },
            ],
            internalType: "struct BlockchainWill.Person",
            name: "testator",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "citizenshipCardId",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "birthdate",
                type: "uint256",
              },
            ],
            internalType: "struct BlockchainWill.Person",
            name: "firstWitness",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "citizenshipCardId",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "birthdate",
                type: "uint256",
              },
            ],
            internalType: "struct BlockchainWill.Person",
            name: "secondWitness",
            type: "tuple",
          },
        ],
        internalType: "struct BlockchainWill.Will",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "personHasCreatedWill",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "publicWills",
    outputs: [
      {
        internalType: "string",
        name: "will",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isPublic",
        type: "bool",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "citizenshipCardId",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "birthdate",
            type: "uint256",
          },
        ],
        internalType: "struct BlockchainWill.Person",
        name: "testator",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "citizenshipCardId",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "birthdate",
            type: "uint256",
          },
        ],
        internalType: "struct BlockchainWill.Person",
        name: "firstWitness",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "citizenshipCardId",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "birthdate",
            type: "uint256",
          },
        ],
        internalType: "struct BlockchainWill.Person",
        name: "secondWitness",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_testatorCitizenshipCardId",
        type: "string",
      },
    ],
    name: "redoWill",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "userCitizenshipCardIdToWill",
    outputs: [
      {
        internalType: "string",
        name: "will",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isPublic",
        type: "bool",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "citizenshipCardId",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "birthdate",
            type: "uint256",
          },
        ],
        internalType: "struct BlockchainWill.Person",
        name: "testator",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "citizenshipCardId",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "birthdate",
            type: "uint256",
          },
        ],
        internalType: "struct BlockchainWill.Person",
        name: "firstWitness",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "citizenshipCardId",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "birthdate",
            type: "uint256",
          },
        ],
        internalType: "struct BlockchainWill.Person",
        name: "secondWitness",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061266f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063b50c669f1161005b578063b50c669f1461012f578063b91bf95c1461015f578063bf06b8a81461017d578063edc913a2146101ad57610088565b806340cc90a41461008d57806359ef3272146100c1578063869401bb146100df57806397ab155714610113575b600080fd5b6100a760048036038101906100a29190611cf5565b6101c9565b6040516100b8959493929190611e9b565b60405180910390f35b6100c9610652565b6040516100d691906120bd565b60405180910390f35b6100f960048036038101906100f4919061210b565b610b24565b60405161010a959493929190611e9b565b60405180910390f35b61012d60048036038101906101289190612164565b610fa7565b005b61014960048036038101906101449190611cf5565b61145d565b604051610156919061231c565b60405180910390f35b610167611493565b6040516101749190612346565b60405180910390f35b61019760048036038101906101929190611cf5565b6114a0565b6040516101a491906123ec565b60405180910390f35b6101c760048036038101906101c29190611cf5565b6119b6565b005b6000818051602081018201805184825260208301602085012081835280955050505050506000915090508060000180546102029061243d565b80601f016020809104026020016040519081016040528092919081815260200182805461022e9061243d565b801561027b5780601f106102505761010080835404028352916020019161027b565b820191906000526020600020905b81548152906001019060200180831161025e57829003601f168201915b5050505050908060010160009054906101000a900460ff1690806002016040518060600160405290816000820180546102b39061243d565b80601f01602080910402602001604051908101604052809291908181526020018280546102df9061243d565b801561032c5780601f106103015761010080835404028352916020019161032c565b820191906000526020600020905b81548152906001019060200180831161030f57829003601f168201915b505050505081526020016001820180546103459061243d565b80601f01602080910402602001604051908101604052809291908181526020018280546103719061243d565b80156103be5780601f10610393576101008083540402835291602001916103be565b820191906000526020600020905b8154815290600101906020018083116103a157829003601f168201915b5050505050815260200160028201548152505090806005016040518060600160405290816000820180546103f19061243d565b80601f016020809104026020016040519081016040528092919081815260200182805461041d9061243d565b801561046a5780601f1061043f5761010080835404028352916020019161046a565b820191906000526020600020905b81548152906001019060200180831161044d57829003601f168201915b505050505081526020016001820180546104839061243d565b80601f01602080910402602001604051908101604052809291908181526020018280546104af9061243d565b80156104fc5780601f106104d1576101008083540402835291602001916104fc565b820191906000526020600020905b8154815290600101906020018083116104df57829003601f168201915b50505050508152602001600282015481525050908060080160405180606001604052908160008201805461052f9061243d565b80601f016020809104026020016040519081016040528092919081815260200182805461055b9061243d565b80156105a85780601f1061057d576101008083540402835291602001916105a8565b820191906000526020600020905b81548152906001019060200180831161058b57829003601f168201915b505050505081526020016001820180546105c19061243d565b80601f01602080910402602001604051908101604052809291908181526020018280546105ed9061243d565b801561063a5780601f1061060f5761010080835404028352916020019161063a565b820191906000526020600020905b81548152906001019060200180831161061d57829003601f168201915b50505050508152602001600282015481525050905085565b60606002805480602002602001604051908101604052809291908181526020016000905b82821015610b1b57838290600052602060002090600b02016040518060a00160405290816000820180546106a99061243d565b80601f01602080910402602001604051908101604052809291908181526020018280546106d59061243d565b80156107225780601f106106f757610100808354040283529160200191610722565b820191906000526020600020905b81548152906001019060200180831161070557829003601f168201915b505050505081526020016001820160009054906101000a900460ff16151515158152602001600282016040518060600160405290816000820180546107669061243d565b80601f01602080910402602001604051908101604052809291908181526020018280546107929061243d565b80156107df5780601f106107b4576101008083540402835291602001916107df565b820191906000526020600020905b8154815290600101906020018083116107c257829003601f168201915b505050505081526020016001820180546107f89061243d565b80601f01602080910402602001604051908101604052809291908181526020018280546108249061243d565b80156108715780601f1061084657610100808354040283529160200191610871565b820191906000526020600020905b81548152906001019060200180831161085457829003601f168201915b505050505081526020016002820154815250508152602001600582016040518060600160405290816000820180546108a89061243d565b80601f01602080910402602001604051908101604052809291908181526020018280546108d49061243d565b80156109215780601f106108f657610100808354040283529160200191610921565b820191906000526020600020905b81548152906001019060200180831161090457829003601f168201915b5050505050815260200160018201805461093a9061243d565b80601f01602080910402602001604051908101604052809291908181526020018280546109669061243d565b80156109b35780601f10610988576101008083540402835291602001916109b3565b820191906000526020600020905b81548152906001019060200180831161099657829003601f168201915b505050505081526020016002820154815250508152602001600882016040518060600160405290816000820180546109ea9061243d565b80601f0160208091040260200160405190810160405280929190818152602001828054610a169061243d565b8015610a635780601f10610a3857610100808354040283529160200191610a63565b820191906000526020600020905b815481529060010190602001808311610a4657829003601f168201915b50505050508152602001600182018054610a7c9061243d565b80601f0160208091040260200160405190810160405280929190818152602001828054610aa89061243d565b8015610af55780601f10610aca57610100808354040283529160200191610af5565b820191906000526020600020905b815481529060010190602001808311610ad857829003601f168201915b505050505081526020016002820154815250508152505081526020019060010190610676565b50505050905090565b60028181548110610b3457600080fd5b90600052602060002090600b0201600091509050806000018054610b579061243d565b80601f0160208091040260200160405190810160405280929190818152602001828054610b839061243d565b8015610bd05780601f10610ba557610100808354040283529160200191610bd0565b820191906000526020600020905b815481529060010190602001808311610bb357829003601f168201915b5050505050908060010160009054906101000a900460ff169080600201604051806060016040529081600082018054610c089061243d565b80601f0160208091040260200160405190810160405280929190818152602001828054610c349061243d565b8015610c815780601f10610c5657610100808354040283529160200191610c81565b820191906000526020600020905b815481529060010190602001808311610c6457829003601f168201915b50505050508152602001600182018054610c9a9061243d565b80601f0160208091040260200160405190810160405280929190818152602001828054610cc69061243d565b8015610d135780601f10610ce857610100808354040283529160200191610d13565b820191906000526020600020905b815481529060010190602001808311610cf657829003601f168201915b505050505081526020016002820154815250509080600501604051806060016040529081600082018054610d469061243d565b80601f0160208091040260200160405190810160405280929190818152602001828054610d729061243d565b8015610dbf5780601f10610d9457610100808354040283529160200191610dbf565b820191906000526020600020905b815481529060010190602001808311610da257829003601f168201915b50505050508152602001600182018054610dd89061243d565b80601f0160208091040260200160405190810160405280929190818152602001828054610e049061243d565b8015610e515780601f10610e2657610100808354040283529160200191610e51565b820191906000526020600020905b815481529060010190602001808311610e3457829003601f168201915b505050505081526020016002820154815250509080600801604051806060016040529081600082018054610e849061243d565b80601f0160208091040260200160405190810160405280929190818152602001828054610eb09061243d565b8015610efd5780601f10610ed257610100808354040283529160200191610efd565b820191906000526020600020905b815481529060010190602001808311610ee057829003601f168201915b50505050508152602001600182018054610f169061243d565b80601f0160208091040260200160405190810160405280929190818152602001828054610f429061243d565b8015610f8f5780601f10610f6457610100808354040283529160200191610f8f565b820191906000526020600020905b815481529060010190602001808311610f7257829003601f168201915b50505050508152602001600282015481525050905085565b600189604051610fb791906124ab565b908152602001604051809103902060009054906101000a900460ff1615611015578a6040517f92054e4900000000000000000000000000000000000000000000000000000000815260040161100c91906124c2565b60405180910390fd5b61101e88611a5b565b61105f578a6040517f4e3d218f00000000000000000000000000000000000000000000000000000000815260040161105691906124c2565b60405180910390fd5b61106884611a5b565b6110a957856040517f4e3d218f0000000000000000000000000000000000000000000000000000000081526004016110a091906124c2565b60405180910390fd5b6110b281611a5b565b6110f357826040517f4e3d218f0000000000000000000000000000000000000000000000000000000081526004016110ea91906124c2565b60405180910390fd5b60006040518060a001604052808c8152602001891515815260200160405180606001604052808f81526020018d81526020018c815250815260200160405180606001604052808a815260200189815260200188815250815260200160405180606001604052808781526020018681526020018581525081525090508060008b60405161117f91906124ab565b908152602001604051809103902060008201518160000190805190602001906111a9929190611a94565b5060208201518160010160006101000a81548160ff02191690831515021790555060408201518160020160008201518160000190805190602001906111ef929190611a94565b50602082015181600101908051906020019061120c929190611a94565b50604082015181600201555050606082015181600501600082015181600001908051906020019061123e929190611a94565b50602082015181600101908051906020019061125b929190611a94565b50604082015181600201555050608082015181600801600082015181600001908051906020019061128d929190611a94565b5060208201518160010190805190602001906112aa929190611a94565b506040820151816002015550509050506001808b6040516112cb91906124ab565b908152602001604051809103902060006101000a81548160ff021916908315150217905550871561144f5760028190806001815401808255809150506001900390600052602060002090600b0201600090919091909150600082015181600001908051906020019061133e929190611a94565b5060208201518160010160006101000a81548160ff0219169083151502179055506040820151816002016000820151816000019080519060200190611384929190611a94565b5060208201518160010190805190602001906113a1929190611a94565b5060408201518160020155505060608201518160050160008201518160000190805190602001906113d3929190611a94565b5060208201518160010190805190602001906113f0929190611a94565b506040820151816002015550506080820151816008016000820151816000019080519060200190611422929190611a94565b50602082015181600101908051906020019061143f929190611a94565b5060408201518160020155505050505b505050505050505050505050565b6001818051602081018201805184825260208301602085012081835280955050505050506000915054906101000a900460ff1681565b6000600280549050905090565b6114a8611b1a565b6001826040516114b891906124ab565b908152602001604051809103902060009054906101000a900460ff16611513576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161150a90612556565b60405180910390fd5b60008260405161152391906124ab565b90815260200160405180910390206040518060a001604052908160008201805461154c9061243d565b80601f01602080910402602001604051908101604052809291908181526020018280546115789061243d565b80156115c55780601f1061159a576101008083540402835291602001916115c5565b820191906000526020600020905b8154815290600101906020018083116115a857829003601f168201915b505050505081526020016001820160009054906101000a900460ff16151515158152602001600282016040518060600160405290816000820180546116099061243d565b80601f01602080910402602001604051908101604052809291908181526020018280546116359061243d565b80156116825780601f1061165757610100808354040283529160200191611682565b820191906000526020600020905b81548152906001019060200180831161166557829003601f168201915b5050505050815260200160018201805461169b9061243d565b80601f01602080910402602001604051908101604052809291908181526020018280546116c79061243d565b80156117145780601f106116e957610100808354040283529160200191611714565b820191906000526020600020905b8154815290600101906020018083116116f757829003601f168201915b5050505050815260200160028201548152505081526020016005820160405180606001604052908160008201805461174b9061243d565b80601f01602080910402602001604051908101604052809291908181526020018280546117779061243d565b80156117c45780601f10611799576101008083540402835291602001916117c4565b820191906000526020600020905b8154815290600101906020018083116117a757829003601f168201915b505050505081526020016001820180546117dd9061243d565b80601f01602080910402602001604051908101604052809291908181526020018280546118099061243d565b80156118565780601f1061182b57610100808354040283529160200191611856565b820191906000526020600020905b81548152906001019060200180831161183957829003601f168201915b5050505050815260200160028201548152505081526020016008820160405180606001604052908160008201805461188d9061243d565b80601f01602080910402602001604051908101604052809291908181526020018280546118b99061243d565b80156119065780601f106118db57610100808354040283529160200191611906565b820191906000526020600020905b8154815290600101906020018083116118e957829003601f168201915b5050505050815260200160018201805461191f9061243d565b80601f016020809104026020016040519081016040528092919081815260200182805461194b9061243d565b80156119985780601f1061196d57610100808354040283529160200191611998565b820191906000526020600020905b81548152906001019060200180831161197b57829003601f168201915b50505050508152602001600282015481525050815250509050919050565b6001816040516119c691906124ab565b908152602001604051809103902060009054906101000a900460ff16611a21576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a1890612556565b60405180910390fd5b6000600182604051611a3391906124ab565b908152602001604051809103902060006101000a81548160ff02191690831515021790555050565b60008042905060006301e1338090506000818584611a7991906125a5565b611a839190612608565b905060128110159350505050919050565b828054611aa09061243d565b90600052602060002090601f016020900481019282611ac25760008555611b09565b82601f10611adb57805160ff1916838001178555611b09565b82800160010185558215611b09579182015b82811115611b08578251825591602001919060010190611aed565b5b509050611b169190611b5d565b5090565b6040518060a0016040528060608152602001600015158152602001611b3d611b7a565b8152602001611b4a611b7a565b8152602001611b57611b7a565b81525090565b5b80821115611b76576000816000905550600101611b5e565b5090565b60405180606001604052806060815260200160608152602001600081525090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611c0282611bb9565b810181811067ffffffffffffffff82111715611c2157611c20611bca565b5b80604052505050565b6000611c34611b9b565b9050611c408282611bf9565b919050565b600067ffffffffffffffff821115611c6057611c5f611bca565b5b611c6982611bb9565b9050602081019050919050565b82818337600083830152505050565b6000611c98611c9384611c45565b611c2a565b905082815260208101848484011115611cb457611cb3611bb4565b5b611cbf848285611c76565b509392505050565b600082601f830112611cdc57611cdb611baf565b5b8135611cec848260208601611c85565b91505092915050565b600060208284031215611d0b57611d0a611ba5565b5b600082013567ffffffffffffffff811115611d2957611d28611baa565b5b611d3584828501611cc7565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611d78578082015181840152602081019050611d5d565b83811115611d87576000848401525b50505050565b6000611d9882611d3e565b611da28185611d49565b9350611db2818560208601611d5a565b611dbb81611bb9565b840191505092915050565b60008115159050919050565b611ddb81611dc6565b82525050565b600082825260208201905092915050565b6000611dfd82611d3e565b611e078185611de1565b9350611e17818560208601611d5a565b611e2081611bb9565b840191505092915050565b6000819050919050565b611e3e81611e2b565b82525050565b60006060830160008301518482036000860152611e618282611df2565b91505060208301518482036020860152611e7b8282611df2565b9150506040830151611e906040860182611e35565b508091505092915050565b600060a0820190508181036000830152611eb58188611d8d565b9050611ec46020830187611dd2565b8181036040830152611ed68186611e44565b90508181036060830152611eea8185611e44565b90508181036080830152611efe8184611e44565b90509695505050505050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b611f3f81611dc6565b82525050565b60006060830160008301518482036000860152611f628282611df2565b91505060208301518482036020860152611f7c8282611df2565b9150506040830151611f916040860182611e35565b508091505092915050565b600060a0830160008301518482036000860152611fb98282611df2565b9150506020830151611fce6020860182611f36565b5060408301518482036040860152611fe68282611f45565b915050606083015184820360608601526120008282611f45565b9150506080830151848203608086015261201a8282611f45565b9150508091505092915050565b60006120338383611f9c565b905092915050565b6000602082019050919050565b600061205382611f0a565b61205d8185611f15565b93508360208202850161206f85611f26565b8060005b858110156120ab578484038952815161208c8582612027565b94506120978361203b565b925060208a01995050600181019050612073565b50829750879550505050505092915050565b600060208201905081810360008301526120d78184612048565b905092915050565b6120e881611e2b565b81146120f357600080fd5b50565b600081359050612105816120df565b92915050565b60006020828403121561212157612120611ba5565b5b600061212f848285016120f6565b91505092915050565b61214181611dc6565b811461214c57600080fd5b50565b60008135905061215e81612138565b92915050565b60008060008060008060008060008060006101608c8e03121561218a57612189611ba5565b5b60008c013567ffffffffffffffff8111156121a8576121a7611baa565b5b6121b48e828f01611cc7565b9b505060208c013567ffffffffffffffff8111156121d5576121d4611baa565b5b6121e18e828f01611cc7565b9a505060408c013567ffffffffffffffff81111561220257612201611baa565b5b61220e8e828f01611cc7565b995050606061221f8e828f016120f6565b98505060806122308e828f0161214f565b97505060a08c013567ffffffffffffffff81111561225157612250611baa565b5b61225d8e828f01611cc7565b96505060c08c013567ffffffffffffffff81111561227e5761227d611baa565b5b61228a8e828f01611cc7565b95505060e061229b8e828f016120f6565b9450506101008c013567ffffffffffffffff8111156122bd576122bc611baa565b5b6122c98e828f01611cc7565b9350506101208c013567ffffffffffffffff8111156122eb576122ea611baa565b5b6122f78e828f01611cc7565b9250506101406123098e828f016120f6565b9150509295989b509295989b9093969950565b60006020820190506123316000830184611dd2565b92915050565b61234081611e2b565b82525050565b600060208201905061235b6000830184612337565b92915050565b600060a083016000830151848203600086015261237e8282611df2565b91505060208301516123936020860182611f36565b50604083015184820360408601526123ab8282611f45565b915050606083015184820360608601526123c58282611f45565b915050608083015184820360808601526123df8282611f45565b9150508091505092915050565b600060208201905081810360008301526124068184612361565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061245557607f821691505b602082108114156124695761246861240e565b5b50919050565b600081905092915050565b600061248582611d3e565b61248f818561246f565b935061249f818560208601611d5a565b80840191505092915050565b60006124b7828461247a565b915081905092915050565b600060208201905081810360008301526124dc8184611d8d565b905092915050565b7f5468697320706572736f6e20686173206e6f742063726561746564206120776960008201527f6c6c000000000000000000000000000000000000000000000000000000000000602082015250565b6000612540602283611d49565b915061254b826124e4565b604082019050919050565b6000602082019050818103600083015261256f81612533565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006125b082611e2b565b91506125bb83611e2b565b9250828210156125ce576125cd612576565b5b828203905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061261382611e2b565b915061261e83611e2b565b92508261262e5761262d6125d9565b5b82820490509291505056fea26469706673582212207da62b790fc6f2698d521993beed43e7fda7150eacffd3b6866dc2b947666edf64736f6c63430008080033";

type BlockchainWillConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BlockchainWillConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BlockchainWill__factory extends ContractFactory {
  constructor(...args: BlockchainWillConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      BlockchainWill & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): BlockchainWill__factory {
    return super.connect(runner) as BlockchainWill__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BlockchainWillInterface {
    return new Interface(_abi) as BlockchainWillInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): BlockchainWill {
    return new Contract(address, _abi, runner) as unknown as BlockchainWill;
  }
}
