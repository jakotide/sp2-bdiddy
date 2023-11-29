// SCSS
import '../../scss/main.scss';

// JS
import '../components/loginSlider';
import { register } from '../api/auth/register'; 
import { registerFormListener } from '../handlers/registerForm';

 
register(); 
registerFormListener();
