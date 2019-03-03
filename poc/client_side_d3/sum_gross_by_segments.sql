SELECT Segment, SUM(Gross_Sales)
FROM dash_db.samples
GROUP BY Segment;