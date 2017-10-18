// [{
//     id: '/1fk;asdfadf',
//     name:'Andrew',
//     room: 'The Office Fans'
// }]

//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room) --> 그 안에 있는 user다 받아서 list로 줌


class Users{
    constructor(){
        this.users=[];
    }
    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        var user= this.getUser(id);
        if(user){
            this.users=this.users.filter((user)=>user.id !== id)
        }
        return user;
    }

    getUser(id){
        return this.users.filter((user)=>user.id===id)[0];
    }
    getUserList(room){
        var users=this.users.filter((user)=>user.room===room);
        var namesArray= users.map((user)=>user.name );

        return namesArray;
    }

}


module.exports={
    Users
};
//
// class Users {
//     constructor(name, age){ //by default
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription(){
//         return `${this.name} is ${this.name} year(s) old`;
//     }
//
//
// };
//
// var me = new Person('Sanghyuk', '25');
// console.log(me.age);
// console.log(me.name);
// var description = me.getUserDescription();
// console.log(description);