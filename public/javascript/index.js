// TEST API CALL
function getSampleData() {
    $.get("api/sample", function(data) {
        console.log(data);
    });
}

getSampleData();