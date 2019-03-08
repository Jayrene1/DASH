module.exports = function(sequelize, DataTypes) {
	var Dashboard = sequelize.define('dashboards', {
		name: {
			type: DataTypes.STRING(24),
			allowNull: false
		},
		graph_ids: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	});
	Dashboard.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Dashboard.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
	return Dashboard
};
