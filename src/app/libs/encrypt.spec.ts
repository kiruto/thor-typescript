import {ENV} from "../build.configs";
import {ThorEncrypt} from "./encrypt";
/**
 * Created by yuriel on 2/10/17.
 */
describe("Check ThorEncrypt", () => {
    const crypto = new ThorEncrypt(ENV.aes_key);

    it("Should decrypt", () => {
        let msg = [
            "6905ace5cb4d1b95TjmR7SrFGo/us7aP9mrm/kMkJkLs3u7SyrjdDBc5nUngkeH+xZeXzs+5PRRn3ju6iNzo9Bbag/zmF1p6ZHo2oKSJgH1rpTjE0XkTBPPFc0T+7Uw1mpxWFIw8xS9i2Ml/BwazsVDaN89h9WcGNuQRWxkKEk7cdgWcYHpjyF+Vl168lO5gWHTXE8acTsamWBGogPOzsoez6vMHVHxyYx5Cv0V2fHEOWR9bI31xlsQtSy1JpCtOE2HaZW07Kq1OpLODlFkXLVbmX7NKhkzbDauxr13WxKGiRLvDq481GGjOpr1OhBRIgRCLaHSrhVaAVsuVqiJIqjIPhJF9f+qtuNZ9iASx1XymHt9cYoQkvtQx44c6f54c25ec729c",
            "92c70aa3b7e9a903iJCwFxYG4IaSXrg4KIBokaSp1T6ccBjEPjPZmRgGhaM1/Vnmavgyda2WxEmx+EWWp4PGrMMSDCyys7e8oRwFS3o/5ebanSmrkCKadekWXR1sjcFP0eo+JsSPwb6ZmAv+Tc8nbYFI/CxGym83cXxILCY/u4px4PpkDbogfDaJdmVlM0KIYWWVQLjlMvrw1Z16xL8Y852wgPTwr24fUxIcHU5YwC41ciV78wyoqp3FBrxp5l3Ja6Pll3lvwuhEzuaCJFO+WFNMRwDy7hjJkcvdsJd8Ff2KQnwJx+vkQf3My4HvKSU+K9EBkkTPUFo4oPXcXrlMy3lgdQDspovyysw7ilSb8oP5aTT9co6YoTNMf353f1482c0dec9b",
            "ba7956281c0a7dfdcDC6+uwdX6irIMXNQD0cJu0Vugx93Yc1tC/ogwPEWuS/oHG2FHA7/vHepnjVjbMmecLQTRO7mpEPLoqpfSf6KyMd3NjbNREfEOCjpe1ilwUh1AWQCxdA96ER62bhb5tCrB48/TjaPlzgs1hRyzSsK1vZvbFHe0Ln1i3ovJJd7rmEJBtIB7mzoRFnlebGXbp9fOV7ZbSA8mP/25ZBSNeEK7EPwHmg48iKLiZdcJaXRLacNKOaceKVDYDTqle9jTfbHZWB6O0DuPVuEK7tk7iDnjVrz6WXxlZtyLRd/R56VxVDufw2XevhqPhOl3MCool9wiB1+9Zq3aDeCjW4Ffrm/aRvudoisMod/5wCR4bU1b1729c37eb445a1",
            "a46fd56e456e47dc79V00xuJQt2q/TBTw/VdPRq1hU1f104WxpjE/GhiRkm2Qj0Swo91AzTg7CZJot2CmMZcXaLCWqWKuVoVz8LZaiICFAxYjgpOJRlCKb9VoFywZJexue8Ctw0lH2aEYFMnkfmtKEzQVxpXcjOCJbjRTJoZh5neP0zBkVciypK3wmr5DJZFLpnY6t9wfDz5JGic6G35tw3/ebNofSHfXAMYk4dLKYcZ3mJF44FLh1X7MuLA8sQYWgLWUwmictxN8xL0HX4sj0+q9QJRCieSDB5AusBDHgOD7ddLahpopca1/mZYI3QOljR1Z268oTcEDethKh9QJ77j+RVgQmj+kWDrktOCkgxEMg/9zXo/25Lqb238215d7b8c2893"
        ];
        let result: string[] = [];
        msg.forEach((it) => {
            result.push(crypto.decrypt(it));
        });
        result.forEach((it) => {
            expect(it).toBe(result[0]);
        })
    })
});