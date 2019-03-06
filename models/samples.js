/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('samples', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		segment: {
			type: DataTypes.STRING(16),
			allowNull: true,
			field: 'Segment'
		},
		country: {
			type: DataTypes.STRING(24),
			allowNull: true,
			field: 'Country'
		},
		product: {
			type: DataTypes.STRING(9),
			allowNull: true,
			field: 'Product'
		},
		discountBand: {
			type: DataTypes.STRING(6),
			allowNull: true,
			field: 'Discount_Band'
		},
		unitsSold: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			field: 'Units_Sold'
		},
		manufacturingPrice: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'Manufacturing_Price'
		},
		salePrice: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'Sale_Price'
		},
		grossSales: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			field: 'Gross_Sales'
		},
		discounts: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			field: 'Discounts'
		},
		sales: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			field: 'Sales'
		},
		cogs: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			field: 'COGS'
		},
		profit: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			field: 'Profit'
		},
		date: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'Date'
		},
		monthNumber: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'Month_Number'
		},
		monthName: {
			type: DataTypes.STRING(9),
			allowNull: true,
			field: 'Month_Name'
		},
		year: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'Year'
		},
		createdAt: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'CreatedAt'
		},
		updatedAt: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'UpdatedAt'
		}
	}, {
		tableName: 'samples'
	});
};
