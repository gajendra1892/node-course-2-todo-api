const  {SHA256} =require('crypto-js');

const jwt =require('jsonwebtoken');

//for auth with jwt-----------
var data={
    id:4
};

var token =jwt.sign(data,'123asd');
console.log('toke:',token);

var decode=jwt.verify(token,'123asd');
console.log('decode:',decode);

//for hashing with crypto-js---------------
// var message='I amuser number 4';
// var hash=SHA256(message).toString();
// console.log(`Message :${message}`);
// console.log(`Hash :${hash}`);

// var data={
//     id:4
// };

// var token={
//     data,
//     hash:SHA256(JSON.stringify(data)+'somesecret').toString(),
// }

// //data.id=5;
// // token.data.id=5;
// // token.hash =SHA256(JSON.stringify(token.data)).toString();

// var resulthash =SHA256(JSON.stringify(token.data)+'somesecret').toString();

// if(resulthash ===token.hash)
// {
//     console.log('Data was not chaned');
// }
// else
// {
//     console.log('Data was changed ,donot trust');
// }