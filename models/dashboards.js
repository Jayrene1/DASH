module.exports = function(sequelize, DataTypes) {
	var Dashboard = sequelize.define('dashboards', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	Dashboard.associate = function(models) {
		Dashboard.belongsTo(models.users, {
			foreignKey: {
				allowNull: false
			  }
			});

	Dashboard.hasMany(models.graphs, {
			onDelete: "cascade"
	});
	}
	return Dashboard;
};
