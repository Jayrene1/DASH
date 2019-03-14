module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		username: {
			type: DataTypes.STRING(48),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(48),
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(24),
			allowNull: false
		}
	});

	User.associate = function(models) {
		User.hasMany(models.Dataset, {
				onDelete: "cascade"
			});
		User.hasMany(models.Dashboard, {
			onDelete: "cascade"
		});
	};

	return User;
};
