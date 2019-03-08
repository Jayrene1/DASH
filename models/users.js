module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('users', {
		username: {
			type: DataTypes.STRING(24),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(48),
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(24),
			allowNull: false
        },
        dashboard_id: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	});

	User.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    User.hasMany(models.dashboards, {
			onDelete: "cascade"
		});
		
		User.hasMany(models.datasets, {
			onDelete: "cascade"
    });
  };


	return User;
};
