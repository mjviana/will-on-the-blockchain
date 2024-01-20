export const blockchainWillAbi = [
  {
    type: "error",
    inputs: [
      {name: "citizenshipCardId", internalType: "string", type: "string"},
    ],
    name: "HasCreatedWill",
  },
  {
    type: "error",
    inputs: [
      {name: "citizenshipCardId", internalType: "string", type: "string"},
    ],
    name: "HasNotCreatedWill",
  },
  {
    type: "error",
    inputs: [{name: "sender", internalType: "address", type: "address"}],
    name: "NotTestator",
  },
  {type: "error", inputs: [], name: "PrivateWill"},
  {type: "error", inputs: [], name: "PublicWill"},
  {
    type: "error",
    inputs: [
      {name: "citizenshipCardId", internalType: "string", type: "string"},
    ],
    name: "UnderAge",
  },
  {
    type: "function",
    inputs: [{name: "", internalType: "string", type: "string"}],
    name: "citizenshipCardIdToAddress",
    outputs: [{name: "", internalType: "address", type: "address"}],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{name: "", internalType: "string", type: "string"}],
    name: "citizenshipCardIdToWill",
    outputs: [
      {name: "will", internalType: "string", type: "string"},
      {name: "isPublic", internalType: "bool", type: "bool"},
      {name: "createdAt", internalType: "uint256", type: "uint256"},
      {name: "secretCode", internalType: "string", type: "string"},
      {
        name: "testator",
        internalType: "struct BlockchainWill.Person",
        type: "tuple",
        components: [
          {name: "name", internalType: "string", type: "string"},
          {name: "citizenshipCardId", internalType: "string", type: "string"},
          {name: "birthdate", internalType: "uint256", type: "uint256"},
        ],
      },
      {
        name: "firstWitness",
        internalType: "struct BlockchainWill.Person",
        type: "tuple",
        components: [
          {name: "name", internalType: "string", type: "string"},
          {name: "citizenshipCardId", internalType: "string", type: "string"},
          {name: "birthdate", internalType: "uint256", type: "uint256"},
        ],
      },
      {
        name: "secondWitness",
        internalType: "struct BlockchainWill.Person",
        type: "tuple",
        components: [
          {name: "name", internalType: "string", type: "string"},
          {name: "citizenshipCardId", internalType: "string", type: "string"},
          {name: "birthdate", internalType: "uint256", type: "uint256"},
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_will",
        internalType: "struct BlockchainWill.WillCreation",
        type: "tuple",
        components: [
          {name: "will", internalType: "string", type: "string"},
          {name: "isPublic", internalType: "bool", type: "bool"},
          {name: "secretCode", internalType: "string", type: "string"},
          {
            name: "testator",
            internalType: "struct BlockchainWill.Person",
            type: "tuple",
            components: [
              {name: "name", internalType: "string", type: "string"},
              {
                name: "citizenshipCardId",
                internalType: "string",
                type: "string",
              },
              {name: "birthdate", internalType: "uint256", type: "uint256"},
            ],
          },
          {
            name: "firstWitness",
            internalType: "struct BlockchainWill.Person",
            type: "tuple",
            components: [
              {name: "name", internalType: "string", type: "string"},
              {
                name: "citizenshipCardId",
                internalType: "string",
                type: "string",
              },
              {name: "birthdate", internalType: "uint256", type: "uint256"},
            ],
          },
          {
            name: "secondWitness",
            internalType: "struct BlockchainWill.Person",
            type: "tuple",
            components: [
              {name: "name", internalType: "string", type: "string"},
              {
                name: "citizenshipCardId",
                internalType: "string",
                type: "string",
              },
              {name: "birthdate", internalType: "uint256", type: "uint256"},
            ],
          },
        ],
      },
    ],
    name: "createWill",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "getPublicWills",
    outputs: [
      {
        name: "",
        internalType: "struct BlockchainWill.Will[]",
        type: "tuple[]",
        components: [
          {name: "will", internalType: "string", type: "string"},
          {name: "isPublic", internalType: "bool", type: "bool"},
          {name: "createdAt", internalType: "uint256", type: "uint256"},
          {name: "secretCode", internalType: "string", type: "string"},
          {
            name: "testator",
            internalType: "struct BlockchainWill.Person",
            type: "tuple",
            components: [
              {name: "name", internalType: "string", type: "string"},
              {
                name: "citizenshipCardId",
                internalType: "string",
                type: "string",
              },
              {name: "birthdate", internalType: "uint256", type: "uint256"},
            ],
          },
          {
            name: "firstWitness",
            internalType: "struct BlockchainWill.Person",
            type: "tuple",
            components: [
              {name: "name", internalType: "string", type: "string"},
              {
                name: "citizenshipCardId",
                internalType: "string",
                type: "string",
              },
              {name: "birthdate", internalType: "uint256", type: "uint256"},
            ],
          },
          {
            name: "secondWitness",
            internalType: "struct BlockchainWill.Person",
            type: "tuple",
            components: [
              {name: "name", internalType: "string", type: "string"},
              {
                name: "citizenshipCardId",
                internalType: "string",
                type: "string",
              },
              {name: "birthdate", internalType: "uint256", type: "uint256"},
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getPublicWillsLength",
    outputs: [{name: "", internalType: "uint256", type: "uint256"}],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_testatorCitizenshipCardId",
        internalType: "string",
        type: "string",
      },
    ],
    name: "getWill",
    outputs: [
      {
        name: "",
        internalType: "struct BlockchainWill.Will",
        type: "tuple",
        components: [
          {name: "will", internalType: "string", type: "string"},
          {name: "isPublic", internalType: "bool", type: "bool"},
          {name: "createdAt", internalType: "uint256", type: "uint256"},
          {name: "secretCode", internalType: "string", type: "string"},
          {
            name: "testator",
            internalType: "struct BlockchainWill.Person",
            type: "tuple",
            components: [
              {name: "name", internalType: "string", type: "string"},
              {
                name: "citizenshipCardId",
                internalType: "string",
                type: "string",
              },
              {name: "birthdate", internalType: "uint256", type: "uint256"},
            ],
          },
          {
            name: "firstWitness",
            internalType: "struct BlockchainWill.Person",
            type: "tuple",
            components: [
              {name: "name", internalType: "string", type: "string"},
              {
                name: "citizenshipCardId",
                internalType: "string",
                type: "string",
              },
              {name: "birthdate", internalType: "uint256", type: "uint256"},
            ],
          },
          {
            name: "secondWitness",
            internalType: "struct BlockchainWill.Person",
            type: "tuple",
            components: [
              {name: "name", internalType: "string", type: "string"},
              {
                name: "citizenshipCardId",
                internalType: "string",
                type: "string",
              },
              {name: "birthdate", internalType: "uint256", type: "uint256"},
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{name: "", internalType: "string", type: "string"}],
    name: "personHasCreatedWill",
    outputs: [{name: "", internalType: "bool", type: "bool"}],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{name: "", internalType: "uint256", type: "uint256"}],
    name: "publicWills",
    outputs: [
      {name: "will", internalType: "string", type: "string"},
      {name: "isPublic", internalType: "bool", type: "bool"},
      {name: "createdAt", internalType: "uint256", type: "uint256"},
      {name: "secretCode", internalType: "string", type: "string"},
      {
        name: "testator",
        internalType: "struct BlockchainWill.Person",
        type: "tuple",
        components: [
          {name: "name", internalType: "string", type: "string"},
          {name: "citizenshipCardId", internalType: "string", type: "string"},
          {name: "birthdate", internalType: "uint256", type: "uint256"},
        ],
      },
      {
        name: "firstWitness",
        internalType: "struct BlockchainWill.Person",
        type: "tuple",
        components: [
          {name: "name", internalType: "string", type: "string"},
          {name: "citizenshipCardId", internalType: "string", type: "string"},
          {name: "birthdate", internalType: "uint256", type: "uint256"},
        ],
      },
      {
        name: "secondWitness",
        internalType: "struct BlockchainWill.Person",
        type: "tuple",
        components: [
          {name: "name", internalType: "string", type: "string"},
          {name: "citizenshipCardId", internalType: "string", type: "string"},
          {name: "birthdate", internalType: "uint256", type: "uint256"},
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_testatorCitizenshipCardId",
        internalType: "string",
        type: "string",
      },
    ],
    name: "revokePrivateWill",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_testatorCitizenshipCardId",
        internalType: "string",
        type: "string",
      },
    ],
    name: "revokePublicWill",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;
