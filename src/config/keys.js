import prod from './prod';
import dev from './dev';

if (process.env.NODE_ENV === 'production') {
  export default prod;
} else {
  export default dev;
}
