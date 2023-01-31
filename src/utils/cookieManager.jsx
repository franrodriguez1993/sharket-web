import Cookies from "universal-cookie";

/**    Esto lo vamos a usar para poder guardar cookies   **/

// El tiempo maximo que va a durar la cookie:
const MAXAGETOKEN = 30 * 30 * 24 * 5; //5 DÍAS PARA TOKEN REFRESH;

const cookieManager = new Cookies();

export { cookieManager, MAXAGETOKEN };
