import { Donacion, Donante, DonacionMonetaria, Bien } from './types';
import { randomNames, randomLastnames, randomAddress } from './constants';


function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getRandomIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomName() {
  return `${randomNames[getRandomInt(randomNames.length)]}`
}

function getRandomLastname() {
  return `${randomLastnames[getRandomInt(randomLastnames.length)]}`
}

function getRandomAddress() {
  return `${randomAddress[getRandomInt(randomAddress.length - 1)]} ${getRandomIntBetween(0, 3000)}`
}

function getRandomPhone() {
  return `+549-${getRandomIntBetween(100, 999)}-${getRandomIntBetween(1000, 9999)}`;
}

function getRandomDonor() {
  return {
    id:	getRandomIntBetween(10000000, 40000000),
    nombre: getRandomName(),
    apellido:	getRandomLastname(),
    dni: String(getRandomIntBetween(10000000, 40000000)),
    domicilio: getRandomAddress(),
    localidad: 'Rosario',
    provincia: 'Santa Fe',
    pais:	'Argentina',
    telefono:	getRandomPhone(),
    usuario: 0,
  } as Donante
}

function getRandomBien() {
  const nombre = getRandomName();
  const nombreArticulo = `Articulo X`;

  return {
    id:	getRandomIntBetween(10000000, 99999999),
    tipo:	getRandomIntBetween(0, 3),
    nombre: nombreArticulo,
    descripcion: `Encarecidamente, espero esta pequeña contribución les sea de ayuda!. Atte: ${nombre}`,
    cantidad: getRandomIntBetween(0, 10),
  } as Bien;
}

function getRandomBienes(amount = 2) {
  const bienes: Bien[] = [];
  for(let idx = 1; idx <= amount; idx++) {
    bienes.push(getRandomBien());
  }

  return bienes;
}

export const generateDonations = (amount = 10) => {
  const donaciones: Donacion[] = [];
  for(let idx = 1; idx <= amount; idx++) {
    const bienes = getRandomBienes();
    donaciones.push({
        id: getRandomIntBetween(10000000, 99999999),
        donante: getRandomDonor(),
        cod_estado: getRandomIntBetween(0, 3),
        bienes,
    })
  }

  return donaciones;
}

// export const monetariasSample: DonacionMonetaria[] = [];