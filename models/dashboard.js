module.exports = function(sequelize, DataTypes) {
	var Dashboard = sequelize.define('Dashboard', {
		dash_name: {
			type: DataTypes.STRING(64),
			allowNull: false
		}
	});

	Dashboard.associate = function(models) {
		Dashboard.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			  }
		});

		Dashboard.hasMany(models.Graph, {
				onDelete: "cascade"
		});
	};
	return Dashboard;
};
