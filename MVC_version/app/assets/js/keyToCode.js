/**
 * Created by ctw on 21/10/14.
 */

/**
 * Convert key to code (for mac)
 * @param key
 */
function keyToCode(key){
  //console.log("Console check key: ", key);

  var out = 0;
switch(key){
    case "up":    out=126; break;
    case "down":  out=125; break;
    case "left":  out=123; break;
    case "right": out=124; break;

    case "escape": out=53; break;
    case "enter": out=36; break;

    case "f1":    out=122; break;
    case "f2":    out=120; break;
    case "f3":    out=99; break;
    case "f4":    out=118; break;
    case "f5":    out=96; break;
    case "f6":    out=97; break;
    case "f7":    out=98; break;
    case "f8":    out=100; break;
    case "f9":    out=101; break;
    case "f10":   out=109; break;
    case "f11":   out=103; break;
    case "f12":   out=111; break;
  }
  return out;
}
