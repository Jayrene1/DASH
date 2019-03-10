module.exports = function(sequelize, DataTypes) {
	var Dashboard = sequelize.define('Dashboard', {
		name: {
			type: DataTypes.STRING,
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
	}
	return Dashboard;
};
