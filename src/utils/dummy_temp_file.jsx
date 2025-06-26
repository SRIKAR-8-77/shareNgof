// Import images
import UberXImg from '../assets/cars/uber x.png';
import UberXLImg from '../assets/cars/uber xl.png';
import ComfortImg from '../assets/cars/uber comfort.png';
import UberPetImg from '../assets/cars/uberpet.png';
import UberBlackImg from '../assets/cars/uber black.png';

export const CarListData = [
  {
    id: 1,
    name: 'Uber X',
    seat: 4,
    desc: 'Affordable, everyday rides for up to 4 people',
    amount: 1.1,
    image: UberXImg
  },
  {
    id: 2,
    name: 'Uber XL',
    seat: 6,
    desc: 'Spacious rides for groups up to 6',
    amount: 1.5,
    image: UberXLImg
  },
  {
    id: 3,
    name: 'Comfort',
    seat: 4,
    desc: 'Newer cars with extra legroom',
    amount: 1.7,
    image: ComfortImg
  },
  {
    id: 4,
    name: 'Uber Pet',
    seat: 4,
    desc: 'Rides for you and your pet',
    amount: 1.6,
    image: UberPetImg
  },
  {
    id: 5,
    name: 'Uber Black',
    seat: 4,
    desc: 'Premium rides in high-end cars',
    amount: 2.0,
    image: UberBlackImg
  }
];
