const cleanString = (searchTerm) => {
  return searchTerm.replace(/\s+/g, "").toLowerCase();
};

export const filterAddressArray = (addressArray, addressSearchTerm) => {
  const cleanAddressSearchTerm = cleanString(addressSearchTerm);

  let filteredAddressArray = [];

  addressArray.map((address) => {
    let cleanFullName = cleanString(
      `${address.first_name}${address.last_name}`
    );
    if (cleanFullName.includes(cleanAddressSearchTerm)) {
      filteredAddressArray.push(address);
    }
  });
  return filteredAddressArray;
};

export const alphabetizeAddressArrayByLastName = (addressArray) =>
  addressArray.sort((a, b) => a.last_name.localeCompare(b.last_name));

export const groupAlphabetizedArrayByFirstLetterLastName = (
  alphabetizedAddressArray
) => {
  let groupedObject = {};
  alphabetizedAddressArray?.map((address) => {
    let firstLetterLastName = address.last_name[0];

    // case where there's no last name
    if (!firstLetterLastName) {
      firstLetterLastName = " ";
    }
    if (Object.hasOwn(groupedObject, firstLetterLastName)) {
      groupedObject[firstLetterLastName].push(address);
    } else {
      groupedObject[firstLetterLastName] = [address];
    }
  });

  return groupedObject;
};
