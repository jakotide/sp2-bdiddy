import '../../scss/main.scss';

import '../components/hamburger';
import { authorizeToken } from '../storage/authorizeToken';
const createLink = document.querySelector("#createBtn");

authorizeToken(
    () => {
        createLink.style.display = "block";
    },
    () => {
        createLink.style.display = "none";
    }
  );