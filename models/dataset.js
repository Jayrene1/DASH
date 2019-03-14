module.exports = function(sequelize, DataTypes) {
	var dataset = sequelize.define('dataset', {
		json_data: {
			type: DataTypes.JSON,
			allowNull: false
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: sequelize.models.user,
				key: 'id'
			}
		}
	},
	 {
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
