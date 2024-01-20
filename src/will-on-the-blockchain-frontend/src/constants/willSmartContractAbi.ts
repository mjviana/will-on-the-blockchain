export const willSmartContractAbi = [
  {
    type: "error",
    name: "HasCreatedWill",
    inputs: [{type: "string", name: "citizenshipCardId"}],
  },
  {
    type: "error",
    name: "HasNotCreatedWill",
    inputs: [{type: "string", name: "citizenshipCardId"}],
  },
  {type: "error", name: "PrivateWill", inputs: []},
  {
    type: "error",
    name: "UnderAge",
    inputs: [{type: "string", name: "citizenshipCardId"}],
  },
  {
    type: "function",
    name: "createWill",
    constant: false,
    payable: false,
    inputs: [
      {
        type: "tuple",
        name: "_will",
        components: [
          {type: "string", name: "will"},
          {type: "bool", name: "isPublic"},
          {type: "uint256", name: "createdAt"},
          {type: "string", name: "secretCode"},
          {
            type: "tuple",
            name: "testator",
            components: [
              {type: "string", name: "name"},
              {type: "string", name: "citizenshipCardId"},
              {type: "uint256", name: "birthdate"},
            ],
          },
          {
            type: "tuple",
            name: "firstWitness",
            components: [
              {type: "string", name: "name"},
              {type: "string", name: "citizenshipCardId"},
              {type: "uint256", name: "birthdate"},
            ],
          },
          {
            type: "tuple",
            name: "secondWitness",
            components: [
              {type: "string", name: "name"},
              {type: "string", name: "citizenshipCardId"},
              {type: "uint256", name: "birthdate"},
            ],
          },
        ],
      },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "getPublicWills",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [
      {
        type: "tuple[]",
        name: "",
        components: [
          {type: "string", name: "will"},
          {type: "bool", name: "isPublic"},
          {type: "uint256", name: "createdAt"},
          {type: "string", name: "secretCode"},
          {
            type: "tuple",
            name: "testator",
            components: [
              {type: "string", name: "name"},
              {type: "string", name: "citizenshipCardId"},
              {type: "uint256", name: "birthdate"},
            ],
          },
          {
            type: "tuple",
            name: "firstWitness",
            components: [
              {type: "string", name: "name"},
              {type: "string", name: "citizenshipCardId"},
              {type: "uint256", name: "birthdate"},
            ],
          },
          {
            type: "tuple",
            name: "secondWitness",
            components: [
              {type: "string", name: "name"},
              {type: "string", name: "citizenshipCardId"},
              {type: "uint256", name: "birthdate"},
            ],
          },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "getPublicWillsLength",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{type: "uint256", name: ""}],
  },
  {
    type: "function",
    name: "getWill",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{type: "string", name: "_testatorCitizenshipCardId"}],
    outputs: [
      {
        type: "tuple",
        name: "",
        components: [
          {type: "string", name: "will"},
          {type: "bool", name: "isPublic"},
          {type: "uint256", name: "createdAt"},
          {type: "string", name: "secretCode"},
          {
            type: "tuple",
            name: "testator",
            components: [
              {type: "string", name: "name"},
              {type: "string", name: "citizenshipCardId"},
              {type: "uint256", name: "birthdate"},
            ],
          },
          {
            type: "tuple",
            name: "firstWitness",
            components: [
              {type: "string", name: "name"},
              {type: "string", name: "citizenshipCardId"},
              {type: "uint256", name: "birthdate"},
            ],
          },
          {
            type: "tuple",
            name: "secondWitness",
            components: [
              {type: "string", name: "name"},
              {type: "string", name: "citizenshipCardId"},
              {type: "uint256", name: "birthdate"},
            ],
          },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "personHasCreatedWill",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{type: "string", name: ""}],
    outputs: [{type: "bool", name: ""}],
  },
  {
    type: "function",
    name: "publicWills",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{type: "uint256", name: ""}],
    outputs: [
      {type: "string", name: "will"},
      {type: "bool", name: "isPublic"},
      {type: "uint256", name: "createdAt"},
      {type: "string", name: "secretCode"},
      {
        type: "tuple",
        name: "testator",
        components: [
          {type: "string", name: "name"},
          {type: "string", name: "citizenshipCardId"},
          {type: "uint256", name: "birthdate"},
        ],
      },
      {
        type: "tuple",
        name: "firstWitness",
        components: [
          {type: "string", name: "name"},
          {type: "string", name: "citizenshipCardId"},
          {type: "uint256", name: "birthdate"},
        ],
      },
      {
        type: "tuple",
        name: "secondWitness",
        components: [
          {type: "string", name: "name"},
          {type: "string", name: "citizenshipCardId"},
          {type: "uint256", name: "birthdate"},
        ],
      },
    ],
  },
  {
    type: "function",
    name: "revokePrivateWill",
    constant: false,
    payable: false,
    inputs: [{type: "string", name: "_testatorCitizenshipCardId"}],
    outputs: [],
  },
  {
    type: "function",
    name: "revokePublicWill",
    constant: false,
    payable: false,
    inputs: [{type: "string", name: "_testatorCitizenshipCardId"}],
    outputs: [],
  },
  {
    type: "function",
    name: "userCitizenshipCardIdToWill",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{type: "string", name: ""}],
    outputs: [
      {type: "string", name: "will"},
      {type: "bool", name: "isPublic"},
      {type: "uint256", name: "createdAt"},
      {type: "string", name: "secretCode"},
      {
        type: "tuple",
        name: "testator",
        components: [
          {type: "string", name: "name"},
          {type: "string", name: "citizenshipCardId"},
          {type: "uint256", name: "birthdate"},
        ],
      },
      {
        type: "tuple",
        name: "firstWitness",
        components: [
          {type: "string", name: "name"},
          {type: "string", name: "citizenshipCardId"},
          {type: "uint256", name: "birthdate"},
        ],
      },
      {
        type: "tuple",
        name: "secondWitness",
        components: [
          {type: "string", name: "name"},
          {type: "string", name: "citizenshipCardId"},
          {type: "uint256", name: "birthdate"},
        ],
      },
    ],
  },
] as const;
