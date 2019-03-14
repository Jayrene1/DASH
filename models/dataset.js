module.exports = function(sequelize, DataTypes) {
	var Dataset = sequelize.define('Dataset', {
		json_data: {
			type: DataTypes.JSON,
			allowNull: false
		}
	});

	Dataset.associate = function(models) {
		Dataset.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			  }
		  });
	  };
	return Dataset;
  };
