module.exports = function(sequelize, DataTypes) {
	var dataset = sequelize.define('dataset', {
		json_data: {
			type: DataTypes.JSON,
			allowNull: false
		},
		source: {
			type: DataTypes.INTEGER,
			references: {
				model: sequelize.models.user,
				key: 'id'
			}
		}
	});

	dataset.associate = function(models) {
		dataset.belongsTo(models.user, {
			foreignKey: 'source',
			constraints: false
		  });
	  };
	return dataset;
  };
