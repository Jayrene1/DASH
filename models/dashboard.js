module.exports = function(sequelize, DataTypes) {
	var dashboard = sequelize.define('dashboard', {
		dash_name: {
			type: DataTypes.STRING(64),
			allowNull: false
		}
	});

	dashboard.associate = function(models) {
		dashboard.belongsTo(models.user, {
			foreignKey: {
				constraints: false,
				allowNull: false
			  }
		});

		dashboard.hasMany(models.graph, {
				onDelete: "cascade"
		});
	};
	return dashboard;
};
