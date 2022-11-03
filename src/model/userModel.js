const Sequelize = require('sequelize');
const db = require('../db/db');

exports.Users = db.define('users', {
    id:{
        type: Sequelize.BIGINT(20),
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    }, 
    group_id:{
        type: Sequelize.BIGINT(20)
    }, 
   
    name:{
        type: Sequelize.STRING
    }, 
    username:{
        type: Sequelize.STRING
    }, 
    password:{
        type: Sequelize.STRING
    }, 
    email:{
        type: Sequelize.STRING(100)
    }, 
    user_phone:{
        type: Sequelize.STRING(20)
    }, 
    remember_token:{
        type: Sequelize.STRING
    }, 
    service_id:{
        type: Sequelize.STRING(100),
        allowNull: true
    }, 
    service_code:{
        type: Sequelize.STRING(10)
    }, 
    created_at:{
        type: Sequelize.DATE
    }, 
    updated_at:{
        type: Sequelize.DATE
    }, 
    allowmobilelogin:{
        type: Sequelize.BOOLEAN,
        allowNull: true
    }, 
    allowdesktoplogin:{
        type: Sequelize.BOOLEAN,
        allowNull: true
    }, 
    first_use:{
        type: Sequelize.BOOLEAN,
        allowNull: true
    }, 
    agency_id:{
        type: Sequelize.INTEGER(11)
    }, 
    tax_office_id:{
        type: Sequelize.INTEGER(11)
    }, 
    user_code:{
        type: Sequelize.BLOB
    }, 
},{
    freezeTableName: true,
    timestamps: false
});

exports.User_groups = db.define('user_groups', {
    idgroups:{
        type: Sequelize.INTEGER(10),
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    group_id:{
        type: Sequelize.INTEGER(10),
        allowNull: true,
    },
    group_name:{
        type: Sequelize.STRING(45),
        allowNull: true,
    },
},{
    freezeTableName: true,
    timestamps: false
});


exports.Username_history = db.define('username_history',{
    user_history_id:{
        type: Sequelize.BIGINT(20),
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type: Sequelize.BIGINT(20),
        allowNull: true,
    },
    group_id:{
        type: Sequelize.BIGINT(20),
        allowNull: true,
    },
    surname:{
        type: Sequelize.STRING
    },
    firstname:{
        type: Sequelize.STRING
    },
    middlename:{
        type: Sequelize.STRING
    },
    fullname:{
        type: Sequelize.STRING
    },
    username:{
        type: Sequelize.STRING(45)
    },
    pwd:{
        type: Sequelize.STRING
    },
    service_id:{
        type: Sequelize.STRING(45),
        allowNull: true
    },
    user_phone:{
        type: Sequelize.STRING(45)
    },
    user_email:{
        type: Sequelize.STRING(50)
    }
},{
    freezeTableName: true,
    timestamps: false
});
