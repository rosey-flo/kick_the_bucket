
const User = require('./User');

const Favorite = require('./Favorite');

//One to Many association

User.hasMany(Favorite)

Favorite.belongsTo(User)




module.exports = {
    User: User,
    Favorite: Favorite
 
}