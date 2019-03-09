module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('users', {
		username: {
			type: DataTypes.STRING,
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
		User.hasMany(models.datasets, {
				onDelete: "cascade"
			});
		User.hasMany(models.dashboards, {
			onDelete: "cascade"
		});
	};

	return User;
};
