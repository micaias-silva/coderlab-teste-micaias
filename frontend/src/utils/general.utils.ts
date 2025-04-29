export const generateNumbersAround = (
  number: number,
  range: number,
  floor: number = 0,
  ceil: number = 0,
  includeInCenter: boolean = true
) => {
  let successors: number[] = [];
  let antecessors: number[] = [];

  for (let i = 1; i <= range; i++) {
    const counter = number - i;
    if (counter > floor) {
      antecessors.push(counter);
    } else {
      break;
    }
  }

  const antecessorCountReachedFloor = 5 - antecessors.length;

  for (let i = 1; i <= range + antecessorCountReachedFloor; i++) {
    const counter = number + i;
    if (ceil) {
      if (counter <= ceil) {
        successors.push(counter);
      } else {
        break;
      }
    } else {
      successors.push(counter);
    }
  }

  if (includeInCenter) {
    return [...antecessors.reverse(), number, ...successors];
  }
  return [...antecessors.reverse(), ...successors];
};

export const numberToCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
};
