module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
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
};
