// 오브젝트 생성
var home = []
var away = []
var timeline = []
var circle_isclicked = false
var player_isclicked = false
var selected_player = "none"

for (var i = 1; i < 12; i++) {
    let tmp = {
        tag: "home" + i.toString(),
        Name: "name",
        Pos: "player",
        Num: 0,
        Change: "none",
        PosX: 0,
        PosY: 0
    }

    home.push(tmp)
}

for (var i = 1; i < 12; i++) {
    let tmp = {
        tag: "away" + i.toString(),
        Name: "name",
        Pos: "player",
        Num: 0,
        Change: "none",
        PosX: 0,
        PosY: 0
    }

    away.push(tmp)
}

// Home/Away 팀 Array에서 타겟으로 지정된 플레이어를 서치
function searchPlayer(target) {
    for (var i = 0; i < home.length; i++) {
        if (home[i].tag == target)
            return home[i]
    }

    for (var i = 0; i < away.length; i++) {
        if (away[i].tag == target)
            return away[i]
    }
}

var svg = d3.select("body").select("#field")
    .on("click", function() {
        // 좌표 계산용
        console.log(d3.mouse(this))

        if (selected_player != "none") {
            console.log(selected_player)
            var target_circle = svg.select("#" + selected_player)
            var x = d3.mouse(this)[0]
            var y = d3.mouse(this)[1]

            target_circle.transition()
                .attr("cx", x.toString())
                .attr("cy", y.toString())

            var tmp = searchPlayer(selected_player)
            tmp.PosX = x
            tmp.PosY = y
        }
    })


function setup(str) {
    var tmp = searchPlayer(str)
    console.log(tmp)
    svg.select("#name")
        .attr("value", function(tmp) { return tmp.Name })
    svg.select("#position")
        .attr("value", function(tmp) { return tmp.Pos })
    svg.select("#number")
        .attr("value", function(tmp) { return tmp.Num })
}

// 필드에 기본값을 가진 홈팀 원(플레이어) 생성
for (var i = 1; i < 12; i++) {
    var g = svg.append("g")
    g.append("circle")
        .attr("id", "home" + i.toString())
        .attr("r", function() { return 20 })
        .attr("cx", 30)
        .attr("cy", 30 + i * 10)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", "1")
        .on("click", function() {
            if (circle_isclicked == false) {
                svg.selectAll("circle").style("opacity", 0.3)
                d3.select(this).style("opacity", 1)
                circle_isclicked = true
                selected_player = this.id
                setup(selected_player)
            } else {
                svg.selectAll("circle").style("opacity", 1)
                circle_isclicked = false
                player_isclicked = false
                selected_player = "none"
            }
        })
    g.append("text")
}

// 필드에 기본값을 가진 어웨이팀 원(플레이어) 생성
for (var i = 1; i < 12; i++) {
    var g = svg.append("g")
    g.append("circle")
        .attr("id", "away" + i.toString())
        .attr("r", function() { return 20 })
        .attr("cx", 1350)
        .attr("cy", 30 + i * 10)
        .attr("fill", "black")
        .attr("stroke", "white")
        .attr("stroke-width", "1")
        .on("click", function() {
            if (circle_isclicked == false) {
                svg.selectAll("circle").style("opacity", 0.3)
                d3.select(this).style("opacity", 1)
                circle_isclicked = true;
                selected_player = this.id
                setup(selected_player)
            } else {
                svg.selectAll("circle").style("opacity", 1)
                circle_isclicked = false;
                player_isclicked = false
                selected_player = "none"
            }
        })
    g.append("text")
}

// Editor에서 버튼을 누른 경우 처리
function playerClick(str) {
    svg.selectAll("g")
        .select("#" + str)
        .style("opacity", function() {
            if (player_isclicked == false) {
                svg.selectAll("g")
                    .selectAll("circle")
                    .style("opacity", 0.3)
                player_isclicked = true
                selected_player = str
                setup(selected_player)
                return 1;
            } else {
                svg.selectAll("g")
                    .selectAll("circle")
                    .style("opacity", 1)
                player_isclicked = false
                circle_isclicked = false
                selected_player = "none"
                return 1;
            }
        })
}

// Default 포메이션 (4-4-2) 설정
function setGK() {
    var homeGK = svg.selectAll("g")
        .select("#home1")
        .attr("cx", 142)
        .attr("cy", 450)

    var awayGK = svg.selectAll("g")
        .select("#away1")
        .attr("cx", 1255)
        .attr("cy", 450)
}

function setDF() {
    for (var i = 2; i < 6; i++) {
        var tmpBack = svg.selectAll("g")
            .select("#home" + i.toString())
            .attr("cx", 284)
            .attr("cy", function() {
                return 170 + (i - 2) * 185
            })
    }

    for (var i = 2; i < 6; i++) {
        var tmpBack = svg.selectAll("g")
            .select("#away" + i.toString())
            .attr("cx", 1110)
            .attr("cy", function() {
                return 170 + (i - 2) * 185
            })
    }
}

function setMF() {
    for (var i = 6; i < 10; i++) {
        var tmpBack = svg.selectAll("g")
            .select("#home" + i.toString())
            .attr("cx", 447)
            .attr("cy", function() {
                return 170 + (i - 6) * 185
            })
    }

    for (var i = 6; i < 10; i++) {
        var tmpBack = svg.selectAll("g")
            .select("#away" + i.toString())
            .attr("cx", 945)
            .attr("cy", function() {
                return 170 + (i - 6) * 185
            })
    }
}

function setFW() {
    for (var i = 10; i < 12; i++) {
        var tmpBack = svg.selectAll("g")
            .select("#home" + i.toString())
            .attr("cx", 620)
            .attr("cy", function() {
                return 355 + (i - 10) * 185
            })
    }

    for (var i = 10; i < 12; i++) {
        var tmpBack = svg.selectAll("g")
            .select("#away" + i.toString())
            .attr("cx", 780)
            .attr("cy", function() {
                return 355 + (i - 10) * 185
            })
    }
}

setGK()
setDF()
setMF()
setFW()

// Editor를 통해 플레이어 정보 변경
function nameChange(text) {
    d3.select("#name")
        .attr("value", text)
}

function posChange(text) {
    d3.select("#position")
        .attr("value", text)
}

function numChange(text) {
    d3.select("#number")
        .attr("value", text)
}

function chgChange(text) {
    d3.select("#change")
        .attr("value", text)
}

function getSetting() {
    var name_input = d3.select("#name").attr("value")
    var pos_input = d3.select("#position").attr("value")
    var num_input = d3.select("#number").attr("value")
    var chg_input = d3.select("#change").attr("value")

    if (selected_player == "none") {
        alert("Select player first.")
        return
    } else {
        var tmp = searchPlayer(selected_player)
        tmp.Name = name_input
        tmp.Pos = pos_input
        tmp.Num = num_input
        tmp.Change = chg_input
        tmp.PosX = d3.select("#" + selected_player).attr("cx")
        tmp.PosY = d3.select("#" + selected_player).attr("cy")

        document.getElementById("button_" + tmp.tag).innerHTML = name_input
    }
}

// 타임라인에서 지정한 타임으로 플레이어 위치 변경
function goto(num) {

}

// 타임라인 Save 기능
function saveTime() {
    var now = {
        time: "time" + (timeline.length + 1).toString(),
        homeState: home,
        awayState: away
    }

    timeline.push(now)

    d3.select("#line")
        .append("button")
        .attr("id", now.time)
        .style("width", "70px")
        .style("height", "30px")
        .attr("onclick", function() {
            return "goto(" + now.time.toString() + ")"
        })

    document.getElementById(now.time).innerHTML = now.time
}

// 마지막 타임라인 제거
function deleteTime() {

}