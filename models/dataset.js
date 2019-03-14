module.exports = function(sequelize, DataTypes) {
	var dataset = sequelize.define('dataset', {
		json_data: {
			type: DataTypes.JSON,
			allowNull: false
		}
	}, {
		underscored: true
	});

	dataset.associate = function(models) {
		dataset.belongsTo(models.user, {
			foreignKey: {
				allowNull: false
			  }
		  });
	  };
	return dataset;
  };
