module.exports = function(sequelize, DataTypes) {
	var Dataset = sequelize.define('datasets', {
		json_data: {
			type: DataTypes.JSON,
			allowNull: false
		},
		
	});

	Dataset.associate = function(models) {
		Dataset.belongsTo(models.users, {
			foreignKey: {
				allowNull: false
			  }
		  });
	  }
	return Dataset;
  };
