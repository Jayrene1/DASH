module.exports = function(sequelize, DataTypes) {
	var Graph = sequelize.define('graphs', {
		graph_name: {
			type: DataTypes.STRING(24),
			allowNull: false
		},
        graph_values: {
			type: DataTypes.JSON,
			allowNull: false
		}
	});

	Graph.associate = function(models) {
		// We're saying that a Post should belong to an Author
		// A Post can't be created without an Author due to the foreign key constraint
		Graph.belongsTo(models.dashboards, {
		  foreignKey: {
			allowNull: false
		  }
		});
	};

	return Graph;
};
