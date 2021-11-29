const fs = require("fs");

class UserInfo {
  constructor() {
    this.userMap = [];
    this._readUserMap();
  }

  getUserMap() {
    return this.userMap;
  }

  async addUserMap(newUserInfo) {
    const newUserMap = [...this.getUserMap()];
    newUserMap.push(newUserInfo);
    this._setUserMap(newUserMap);
    const convertedUserData = this._convertStructureUserMap(newUserMap);
    await this._writeUserMap(convertedUserData);
    //이렇게 하는 것이 플로우에 더욱 안정적인지?
    //이유 생각해보기
  }

  checkUserInfo({ id, password }) {
    const loginUser = this.getUserMap().find((e) => e.id === id);
    return loginUser ? loginUser.password1 === password : false;
  }

  _setUserMap(newUserMap) {
    this.userMap = [...newUserMap];
  }

  _readUserMap() {
    fs.readFile("./user-map.json", (err, data) => {
      const userData = JSON.parse(data);
      this._setUserMap(Object.keys(userData).map((idx) => userData[idx]));
    });
  }

  _writeUserMap(data) {
    fs.writeFile("./user-map.json", data, (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });
  }

  _convertStructureUserMap(userMap) {
    const data = JSON.stringify(
      userMap.reduce((acc, cur, n = 1) => {
        acc[n] = { ...cur };
        return acc;
      }, {})
    );
    return data;
  }
}

//user-map 상태가 변할 때 마다 알려줄 필요가 있을까?
//같이 변경되야할 것이 있는지 생각해보기

module.exports = UserInfo;
