module.exports = function(sequelize, DataTypes) {
	var user = sequelize.define('user', {
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
	}, {
		underscored: true
	  });

	user.associate = function(models) {
		user.hasMany(models.dataset, {
				onDelete: "cascade"
			});
		user.hasMany(models.dashboard, {
			onDelete: "cascade"
		});
	};

	return user;
};
