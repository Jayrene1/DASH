module.exports = function(sequelize, DataTypes) {
	var dataset = sequelize.define('dataset', {
		json_data: {
			type: DataTypes.JSON,
			allowNull: false
		}
	});

	dataset.associate = function(models) {
		dataset.belongsTo(models.user);
	  };
	return dataset;
  };
