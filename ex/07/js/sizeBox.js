$(function() {
    var showsizeFun = function() {
        var tmpX, posX, objX;
        var scrollClass = ".draggable";
        var centerline = $(scrollClass).width() / 2;
        var formatStart = 90;
        var modulus = 0.1995;

        //format
        $(scrollClass).each(function() {
            $(this).find("p").css({ "width": ($(this).attr("end") - $(this).attr("begin")) / modulus + "px", "background-position": "-" + $(this).attr("begin") / modulus + "px 0", "left": centerline - (formatStart - $(this).attr("begin")) / modulus + "px" });
        })
        $(".show-sizeop .control .value input").val(formatStart);

        function endFun() {
            $(".show-sizeop").unbind('mousemove');
        }

        function mousePos(e) {
            var x;
            var e = e || window.event;
            return {
                x: e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
            };
        };

        function showValue(obj) {
            var obj = obj;
            var _input = ".show-sizeop .control .value input";
            var _index = obj.index();
            var objIndex = obj.siblings(scrollClass + "[name=" + obj.attr("name") + "]").index();
            $(_input).eq(_index).val(Math.round((-obj.find("p").position().left + centerline + parseInt($(scrollClass).eq(_index).attr("begin")) / modulus) * modulus));
            $(_input).eq(objIndex).val(Math.round((-$(scrollClass).eq(objIndex).find("p").position().left + centerline + parseInt($(scrollClass).eq(objIndex).attr("begin")) / modulus) * modulus));
        }

        function bindScroll(obj) {
            var obj = obj;
            var _index = obj.index();
            var nowPos = obj.find("p").position().left - parseInt(obj.attr("begin") / modulus);
            var siblingsPos = obj.siblings(scrollClass + "[name=" + obj.attr("name") + "]").find("p").position().left - parseInt(obj.siblings(scrollClass + "[name=" + obj.attr("name") + "]").attr("begin") / modulus);

            showValue(obj);
            //alert(nowPos);

            function bindMove(obj) {
                obj.siblings(scrollClass + "[name=" + obj.attr("name") + "]").find("p").css("left", obj.find("p").position().left - parseInt(obj.attr("begin") / modulus) + parseInt(obj.siblings(scrollClass + "[name=" + obj.attr("name") + "]").attr("begin") / modulus) + "px");
            }

            if (obj.attr("type") == "first") {  //向右拖动关联事件
                if (nowPos > siblingsPos) {
                    if (siblingsPos < centerline) {
                        bindMove(obj);
                    }
                    else {
                        obj.siblings(scrollClass + "[name=" + obj.attr("name") + "]").find("p").css("left", centerline + "px");
                    }
                }
            }
            else {  //向左拖动关联事件
                if (nowPos < siblingsPos) {
                    bindMove(obj);
                }
            }
        }

        //size
        var LASCANA_SIZE_A = {
            Chart: {
                70: { 63: '65AA', 64: '', 65: '', 66: '', 67: '' },
                71: { 63: '65AA', 64: '65AA', 65: '', 66: '', 67: '' },
                72: { 63: '65AA', 64: '65AA', 65: '65AA', 66: '', 67: '' },
                73: { 63: '65A', 64: '65AA', 65: '65AA', 66: '65AA', 67: '' },
                74: { 63: '65A', 64: '65A', 65: '65AA', 66: '65AA', 67: '65AA' },
                75: { 63: '65A', 64: '65A', 65: '65A', 66: '65AA', 67: '65AA', 68: '70AA', 69: '', 70: '', 71: '', 72: '' },
                76: { 63: '65B', 64: '65B', 65: '65A', 66: '65A', 67: '65AA', 68: '70AA', 69: '70AA', 70: '', 71: '', 72: '' },
                77: { 63: '65B', 64: '65B', 65: '65B', 66: '65A', 67: '65A', 68: '70AA', 69: '70AA', 70: '70AA', 71: '', 72: '' },
                78: { 63: '65C', 64: '65B', 65: '65B', 66: '65B', 67: '65A', 68: '70A', 69: '70AA', 70: '70AA', 71: '70AA', 72: '' },
                79: { 63: '65C', 64: '65C', 65: '65B', 66: '65B', 67: '65B', 68: '70A', 69: '70A', 70: '70AA', 71: '70AA', 72: '70AA' },
                80: { 63: '65C', 64: '65C', 65: '65C', 66: '65B', 67: '65B', 68: '70B', 69: '70A', 70: '70A', 71: '70AA', 72: '70AA', 73: '75AA', 74: '', 75: '', 76: '', 77: '' },
                81: { 63: '', 64: '65C', 65: '65C', 66: '65C', 67: '65B', 68: '70B', 69: '70B', 70: '70A', 71: '70A', 72: '70AA', 73: '75AA', 74: '75AA', 75: '', 76: '', 77: '' },
                82: { 63: '', 64: '', 65: '65C', 66: '65C', 67: '65C', 68: '70B', 69: '70B', 70: '70B', 71: '70A', 72: '70A', 73: '75AA', 74: '75AA', 75: '75AA', 76: '', 77: '' },
                83: { 63: '', 64: '', 65: '', 66: '65C', 67: '65C', 68: '70C', 69: '70B', 70: '70B', 71: '70B', 72: '70A', 73: '75A', 74: '75A', 75: '75A', 76: '75A', 77: '' },
                84: { 68: '70C', 69: '70C', 70: '70B', 71: '70B', 72: '70B', 73: '75A', 74: '75A', 75: '75AA', 76: '75AA', 77: '75AA' },
                85: { 68: '70C', 69: '70C', 70: '70C', 71: '70B', 72: '70B', 73: '75B', 74: '75A', 75: '75A', 76: '75AA', 77: '75AA', 78: '80AA', 79: '', 80: '', 81: '', 82: '' },
                86: { 68: '70D', 69: '70D', 70: '70C', 71: '70C', 72: '70B', 73: '75B', 74: '75B', 75: '75A', 76: '75A', 77: '75AA', 78: '80AA', 79: '80AA', 80: '', 81: '', 82: '' },
                87: { 68: '70D', 69: '70D', 70: '70D', 71: '70C', 72: '70C', 73: '75B', 74: '75B', 75: '75B', 76: '75A', 77: '70A', 78: '80AA', 79: '80AA', 80: '80AA', 81: '', 82: '' },
                88: { 68: '70D', 69: '70D', 70: '70D', 71: '70D', 72: '70C', 73: '75C', 74: '75B', 75: '75B', 76: '75B', 77: '75A', 78: '80A', 79: '80AA', 80: '80AA', 81: '80AA', 82: '' },
                89: { 68: '', 69: '70D', 70: '70D', 71: '70D', 72: '70D', 73: '75C', 74: '75C', 75: '75B', 76: '75B', 77: '75B', 78: '80A', 79: '80A', 80: '80AA', 81: '80AA', 82: '80AA' },
                90: { 68: '', 69: '', 70: '70D', 71: '70D', 72: '70D', 73: '75D', 74: '75C', 75: '75C', 76: '75B', 77: '75B', 78: '80B', 79: '80A', 80: '80A', 81: '80AA', 82: '80AA' },
                91: { 68: '', 69: '', 70: '', 71: '70D', 72: '70D', 73: '75D', 74: '75D', 75: '75C', 76: '75C', 77: '75B', 78: '80B', 79: '80B', 80: '80A', 81: '80A', 82: '80AA' },
                92: { 68: '', 69: '', 70: '', 71: '', 72: '70D', 73: '75D', 74: '75D', 75: '75D', 76: '75C', 77: '75C', 78: '80C', 79: '80B', 80: '80B', 81: '80A', 82: '80A' },
                93: { 73: '75D', 74: '75D', 75: '75D', 76: '75D', 77: '75C', 78: '80C', 79: '80B', 80: '80B', 81: '80B', 82: '80A', 83: '85A', 84: '', 85: '', 86: '', 87: '' },
                94: { 73: '75E', 74: '75E', 75: '75D', 76: '75D', 77: '75D', 78: '80C', 79: '80C', 80: '80B', 81: '80B', 82: '80B', 83: '85A', 84: '85A', 85: '', 86: '', 87: '' },
                95: { 73: '75F', 74: '75E', 75: '75E', 76: '75D', 77: '75D', 78: '80D', 79: '80C', 80: '80C', 81: '80B', 82: '80B', 83: '85B', 84: '85A', 85: '85A', 86: '', 87: '' },
                96: { 73: '75F', 74: '75F', 75: '75E', 76: '75E', 77: '75D', 78: '80D', 79: '80D', 80: '80C', 81: '80C', 82: '80B', 83: '85B', 84: '85B', 85: '85A', 86: '85A', 87: '' },
                97: { 73: '75F', 74: '75F', 75: '75F', 76: '75E', 77: '75E', 78: '80D', 79: '80D', 80: '80D', 81: '80C', 82: '80C', 83: '85B', 84: '85B', 85: '85B', 86: '85A', 87: '85A' },
                98: { 73: '75G', 74: '75F', 75: '75F', 76: '75F', 77: '75E', 78: '80E', 79: '80D', 80: '80D', 81: '80D', 82: '80C', 83: '85C', 84: '85B', 85: '85B', 86: '85B', 87: '85A' },
                99: { 73: '75G', 74: '75G', 75: '75F', 76: '75F', 77: '75F', 78: '80E', 79: '80E', 80: '80D', 81: '80D', 82: '80D', 83: '85C', 84: '85C', 85: '85B', 86: '85B', 87: '85B' },
                100: { 73: '75G', 74: '75G', 75: '75G', 76: '75F', 77: '75F', 78: '80E', 79: '80E', 80: '80E', 81: '80D', 82: '80D', 83: '85C', 84: '85C', 85: '85C', 86: '85B', 87: '85B', 88: '90A', 89: '90A', 90: '90A', 91: '90AA', 92: '90AA' },
                101: { 73: '', 74: '75G', 75: '75G', 76: '75G', 77: '75F', 78: '80F', 79: '80E', 80: '80E', 81: '80E', 82: '80D', 83: 'D', 84: '85C', 85: '85C', 86: '85C', 87: '85B', 88: '90B', 89: '90A', 90: '90A', 91: '90A', 92: '90AA' },
                102: { 73: '', 74: '', 75: '75G', 76: '75G', 77: '75G', 78: '80F', 79: '80F', 80: '80E', 81: '80E', 82: '80E', 83: 'D', 84: '85D', 85: '85C', 86: '85C', 87: '85C', 88: '90B', 89: '90B', 90: '90A', 91: '90A', 92: '90A' },
                103: { 73: '', 74: '', 75: '', 76: 'VG', 77: '75G', 78: '80G', 79: '80F', 80: '80F', 81: '80E', 82: '80E', 83: 'E', 84: '85D', 85: '85D', 86: '85C', 87: '85C', 88: '90C', 89: '90B', 90: '90B', 91: '90A', 92: '90A' },
                104: { 73: '', 74: '', 75: '', 76: '', 77: '75G', 78: '80G', 79: '80G', 80: '80F', 81: '80F', 82: '80E', 83: 'E', 84: '85E', 85: '85D', 86: '85D', 87: '85C', 88: '90C', 89: '90C', 90: '90B', 91: '90B', 92: '90A' },
                105: { 78: '80G', 79: '80G', 80: '80G', 81: '80F', 82: '80F', 83: '85E', 84: '85E', 85: '85E', 86: '85D', 87: '85D', 88: '90C', 89: '90C', 90: '90C', 91: '90B', 92: '90B', 93: '95A', 94: '95A', 95: '95A', 96: '95AA', 97: '95AA' },
                106: { 78: '', 79: '80G', 80: '80G', 81: '80G', 82: '80F', 83: '85F', 84: '85E', 85: '85E', 86: '85E', 87: '85D', 88: '90D', 89: '90C', 90: '90C', 91: '90C', 92: '90B', 93: '95B', 94: '95A', 95: '95A', 96: '95A', 97: '95AA' },
                107: { 78: '', 79: '', 80: '80G', 81: '80G', 82: '80G', 83: '85F', 84: '85F', 85: '85E', 86: '85E', 87: '85E', 88: '90D', 89: '90D', 90: '90C', 91: '90C', 92: '90C', 93: '95B', 94: '95B', 95: 'VA', 96: '95A', 97: '95A' },
                108: { 78: '', 79: '', 80: '', 81: '80G', 82: '80G', 83: '85G', 84: '85F', 85: '85F', 86: '85E', 87: '85E', 88: '90E', 89: '90D', 90: '90D', 91: '90C', 92: '90C', 93: '95C', 94: '95B', 95: '95B', 96: '95A', 97: '95A' },
                109: { 78: '', 79: '', 80: '', 81: '', 82: '80G', 83: '85G', 84: '85G', 85: '85F', 86: '85F', 87: '85E', 88: '90E', 89: '90E', 90: '90D', 91: '90D', 92: '90C', 93: '95C', 94: '95C', 95: '95B', 96: '95B', 97: '95A' },
                110: { 83: '85G', 84: '85G', 85: '85G', 86: '85F', 87: '85F', 88: '90E', 89: '90E', 90: '90E', 91: '90D', 92: '90D', 93: '95C', 94: '95C', 95: '95C', 96: '95B', 97: '95B', 98: '100A', 99: '100A', 100: '100A', 101: '100AA', 102: '100AA' },
                111: { 83: '', 84: '85G', 85: '85G', 86: '85G', 87: '85F', 88: '90F', 89: '90E', 90: '90E', 91: '90E', 92: '90D', 93: '95D', 94: '95C', 95: '95C', 96: '95C', 97: '95B', 98: '100B', 99: '100A', 100: '100A', 101: '100A', 102: '100AA' },
                112: { 83: '', 84: '', 85: '85G', 86: '85G', 87: '85G', 88: '90F', 89: '90F', 90: '90E', 91: '90E', 92: '90E', 93: '95D', 94: '95D', 95: '95C', 96: '95C', 97: '95C', 98: 'B100', 99: '100B', 100: '100A', 101: '100A', 102: '100A' },
                113: { 83: '', 84: '', 85: '', 86: '85G', 87: '85G', 88: '90G', 89: '90F', 90: '90F', 91: '90E', 92: '90E', 93: '95E', 94: '95D', 95: '95D', 96: '95C', 97: '95C', 98: 'C100', 99: '100B', 100: '100B', 101: '100A', 102: '100A' },
                114: { 83: '', 84: '', 85: '', 86: '', 87: '85G', 88: '90G', 89: '90G', 90: '90F', 91: '90F', 92: '90E', 93: '95E', 94: '95E', 95: '95D', 96: '95D', 97: '95C', 98: 'C100', 99: '100C', 100: '100B', 101: '100B', 102: '100A' },
                115: { 88: '90G', 89: '90G', 90: '90G', 91: '90F', 92: '90F', 93: '95E', 94: '95E', 95: '95E', 96: '95D', 97: '95D', 98: '100C', 99: '100C', 100: '100C', 101: '100B', 102: '100B' },
                116: { 88: '', 89: '90G', 90: '90G', 91: '90G', 92: '90F', 93: '95F', 94: '95E', 95: '95E', 96: '95E', 97: '95D', 98: '100D', 99: '100C', 100: '100C', 101: '100C', 102: '100B' },
                117: { 88: '', 89: '', 90: '90G', 91: '90G', 92: '90G', 93: '95F', 94: '95F', 95: '95E', 96: '95E', 97: '95E', 98: '100D', 99: '100D', 100: '100C', 101: '100C', 102: '100C' },
                118: { 88: '', 89: '', 90: '', 91: '90G', 92: '90G', 93: '95G', 94: '95F', 95: '95F', 96: '95E', 97: '95E', 98: '100E', 99: '100D', 100: '100D', 101: '100C', 102: '100C' },
                119: { 88: '', 89: '', 90: '', 91: '', 92: '90G', 93: '95G', 94: '95G', 95: '95F', 96: '95F', 97: '95E', 98: '100E', 99: '100E', 100: '100D', 101: '100D', 102: '100C' },
                120: { 93: '95G', 94: '95G', 95: '95G', 96: '95F', 97: '95F', 98: '100E', 99: '100E', 100: '100E', 101: '100D', 102: '100D' },
                121: { 93: '', 94: '95G', 95: '95G', 96: '95G', 97: '95F', 98: '100F', 99: '100E', 100: '100E', 101: '100E', 102: '100D' },
                122: { 93: '', 94: '', 95: '95G', 96: '95G', 97: '95G', 98: '100F', 99: '100F', 100: '100E', 101: '100E', 102: '100E' },
                123: { 93: '', 94: '', 95: '', 96: '95G', 97: '95G', 98: '100G', 99: '100F', 100: '100F', 101: '100E', 102: '100E' },
                124: { 93: '', 94: '', 95: '', 96: '', 97: '95G', 98: '100G', 99: '100G', 100: '100F', 101: '100F', 102: '100E' },
                125: { 98: '100G', 99: '100G', 100: '100G', 101: '100F', 102: '100F' },
                126: { 98: '', 99: '100G', 100: '100G', 101: '100G', 102: '100G' },
                127: { 98: '', 99: '', 100: '100G', 101: '100G', 102: '100G' },
                128: { 98: '', 99: '', 100: '', 101: '100G', 102: '100G' },
                129: { 98: '', 99: '', 100: '', 101: '', 102: '100G' }
            },
            // 获取与胸围腰围相关联的尺码
            getSizeRelev: function(x, y) {
                if (LASCANA_SIZE_A.Chart[x] && LASCANA_SIZE_A.Chart[x][y]) {
                    return LASCANA_SIZE_A.Chart[x][y];
                }
                return '？';
            }
        };
        var LASCANA_SIZE_B = {
            Chart: {
                58: { 77: 'XS', 78: 'XS', 79: 'XS', 80: 'XS', 81: 'XS', 82: 'XS', 83: 'XS', 84: 'XS', 85: 'XS' },
                59: { 77: 'XS', 78: 'XS', 79: 'XS', 80: 'XS', 81: 'XS', 82: 'XS', 83: 'XS', 84: 'XS', 85: 'XS' },
                60: { 77: 'XS', 78: 'XS', 79: 'XS', 80: 'XS', 81: 'XS', 82: 'XS', 83: 'XS', 84: 'XS', 85: 'XS' },
                61: { 77: 'XS', 78: 'XS', 79: 'XS', 80: 'XS', 81: 'XS', 82: 'XS', 83: 'XS', 84: 'XS', 85: 'XS' },
                62: { 77: 'XS', 78: 'XS', 79: 'XS', 80: 'XS', 81: 'XS', 82: 'XS', 83: 'XS', 84: 'XS', 85: 'XS', 86: 'S', 87: 'S', 88: 'S', 89: 'S', 90: 'S' },
                63: { 82: 'S', 83: 'S', 84: 'S', 85: 'S', 86: 'S', 87: 'S', 88: 'S', 89: 'S', 90: 'S' },
                64: { 82: 'S', 83: 'S', 84: 'S', 85: 'S', 86: 'S', 87: 'S', 88: 'S', 89: 'S', 90: 'S' },
                65: { 82: 'S', 83: 'S', 84: 'S', 85: 'S', 86: 'S', 87: 'S', 88: 'S', 89: 'S', 90: 'S' },
                66: { 82: 'S', 83: 'S', 84: 'S', 85: 'S', 86: 'S', 87: 'S', 88: 'S', 89: 'S', 90: 'S', 91: 'M', 92: 'M', 93: 'M', 94: 'M', 95: 'M' },
                67: { 87: 'M', 88: 'M', 89: 'M', 90: 'M', 91: 'M', 92: 'M', 93: 'M', 94: 'M', 95: 'M' },
                68: { 87: 'M', 88: 'M', 89: 'M', 90: 'M', 91: 'M', 92: 'M', 93: 'M', 94: 'M', 95: 'M' },
                69: { 87: 'M', 88: 'M', 89: 'M', 90: 'M', 91: 'M', 92: 'M', 93: 'M', 94: 'M', 95: 'M' },
                70: { 87: 'M', 88: 'M', 89: 'M', 90: 'M', 91: 'M', 92: 'M', 93: 'M', 94: 'M', 95: 'M', 96: 'L', 97: 'L', 98: 'L', 99: 'L', 100: 'L' },
                71: { 92: 'L', 93: 'L', 94: 'L', 95: 'L', 96: 'L', 97: 'L', 98: 'L', 99: 'L', 100: 'L' },
                72: { 92: 'L', 93: 'L', 94: 'L', 95: 'L', 96: 'L', 97: 'L', 98: 'L', 99: 'L', 100: 'L' },
                73: { 92: 'L', 93: 'L', 94: 'L', 95: 'L', 96: 'L', 97: 'L', 98: 'L', 99: 'L', 100: 'L' },
                74: { 92: 'L', 93: 'L', 94: 'L', 95: 'L', 96: 'L', 97: 'L', 98: 'L', 99: 'L', 100: 'L', 101: 'XL', 102: 'XL', 103: 'XL', 104: 'XL', 105: 'XL' },
                75: { 97: 'XL', 98: 'XL', 99: 'XL', 100: 'XL', 101: 'XL', 102: 'XL', 103: 'XL', 104: 'XL', 105: 'XL' },
                76: { 97: 'XL', 98: 'XL', 99: 'XL', 100: 'XL', 101: 'XL', 102: 'XL', 103: 'XL', 104: 'XL', 105: 'XL' },
                77: { 97: 'XL', 98: 'XL', 99: 'XL', 100: 'XL', 101: 'XL', 102: 'XL', 103: 'XL', 104: 'XL', 105: 'XL' },
                78: { 97: 'XL', 98: 'XL', 99: 'XL', 100: 'XL', 101: 'XL', 102: 'XL', 103: 'XL', 104: 'XL', 105: 'XL' },
                79: { 97: 'XL', 98: 'XL', 99: 'XL', 100: 'XL', 101: 'XL', 102: 'XL', 103: 'XL', 104: 'XL', 105: 'XL' },
                80: { 97: 'XL', 98: 'XL', 99: 'XL', 100: 'XL', 101: 'XL', 102: 'XL', 103: 'XL', 104: 'XL', 105: 'XL', 106: 'XXL', 107: 'XXL', 108: 'XXL', 109: 'XXL', 110: 'XXL' },
                81: { 102: 'XXL', 103: 'XXL', 104: 'XXL', 105: 'XXL', 106: 'XXL', 107: 'XXL', 108: 'XXL', 109: 'XXL', 110: 'XXL' },
                82: { 102: 'XXL', 103: 'XXL', 104: 'XXL', 105: 'XXL', 106: 'XXL', 107: 'XXL', 108: 'XXL', 109: 'XXL', 110: 'XXL' },
                83: { 102: 'XXL', 103: 'XXL', 104: 'XXL', 105: 'XXL', 106: 'XXL', 107: 'XXL', 108: 'XXL', 109: 'XXL', 110: 'XXL' },
                84: { 102: 'XXL', 103: 'XXL', 104: 'XXL', 105: 'XXL', 106: 'XXL', 107: 'XXL', 108: 'XXL', 109: 'XXL', 110: 'XXL' },
                85: { 102: 'XXL', 103: 'XXL', 104: 'XXL', 105: 'XXL', 106: 'XXL', 107: 'XXL', 108: 'XXL', 109: 'XXL', 110: 'XXL' },
                86: { 102: 'XXL', 103: 'XXL', 104: 'XXL', 105: 'XXL', 106: 'XXL', 107: 'XXL', 108: 'XXL', 109: 'XXL', 110: 'XXL' }
            },
            // 获取与胸围腰围相关联的尺码
            getSizeRelev: function(x, y) {
                if (LASCANA_SIZE_B.Chart[x] && LASCANA_SIZE_B.Chart[x][y]) {
                    return LASCANA_SIZE_B.Chart[x][y];
                }
                return '？';
            }
        };

        $(scrollClass).mousedown(function(e) {
            var objDrag = $(this);
            var _index = objDrag.index();
            objX = objDrag.find("p").position().left;
            tmpX = mousePos(e).x;
            $(".show-sizeop").mousemove(function(e) {
                posX = mousePos(e).x;
                moveX = posX - tmpX;
                objDrag.find("p").css("left", objX + posX - tmpX + "px");

                if (objDrag.find("p").position().left > centerline) {
                    objDrag.find("p").css("left", centerline + "px");
                }
                if (objDrag.find("p").position().left < centerline - objDrag.find("p").width()) {
                    objDrag.find("p").css("left", centerline - objDrag.find("p").width() + "px");
                }

                bindScroll(objDrag);

                //size
                if (objDrag.attr("id") == "draggable1" || objDrag.attr("id") == "draggable2") {
                    $(".show-sizeop .list-view li.type-1 p").text(LASCANA_SIZE_A.getSizeRelev($("#control_1 input").val(), $("#control_2 input").val()));
                }
                if (objDrag.attr("id") == "draggable3" || objDrag.attr("id") == "draggable4") {
                    //$(".show-sizeop .list-view li.type-2 p").text(LASCANA_SIZE_B.getSizeRelev($("#control_3 input").val(), $("#control_4 input").val()));
                    var valInput4 = $("#control_4 input").val();
                    var valOutput;
                    if (valInput4 >= 82 && valInput4 < 87){
                        valOutput = "S";
                    }
                    else if (valInput4 >= 87 && valInput4 < 90){
                        valOutput = "S/M";
                    }
                    else if (valInput4 >= 90 && valInput4 < 92){
                        valOutput = "M";
                    }
                    else if (valInput4 >= 92 && valInput4 < 95){
                        valOutput = "M/L";
                    }
                    else if (valInput4 >= 95 && valInput4 < 97){
                        valOutput = "L";
                    }
                    else if (valInput4 >= 97 && valInput4 < 100){
                        valOutput = "L/XL";
                    }
                    else if (valInput4 >= 97 && valInput4 < 105){
                        valOutput = "XL";
                    }
                    else{
                        valOutput = "？";
                    }
                    $(".show-sizeop .list-view li.type-2 p").text(valOutput);
                }
            });
        }).mouseup(function() {
            endFun();
        }).mouseout(function() {
            endFun();
        });

        //input event
        $(".show-sizeop .control .value input").focus(function() {
            var objInput = $(this);
            var _index = objInput.parents(".control").index() - 1;
            objInput.select();
            objInput.keyup(function() {
                if ($.trim(objInput.val()) >= parseInt($(scrollClass).eq(_index).attr("begin")) && $.trim(objInput.val()) <= parseInt($(scrollClass).eq(_index).attr("end"))) { //201307261346
                    $(scrollClass).eq(_index).find("p").css("left", $(scrollClass).eq(_index).attr("begin") / modulus + centerline - objInput.val() / modulus + "px");
                    if ($(this).parents("div.control").attr("id") == "control_1" || $(this).parents("div.control").attr("id") == "control_2") {
                        $(".show-sizeop .list-view li.type-1 p").text(LASCANA_SIZE_A.getSizeRelev($("#control_1 input").val(), $("#control_2 input").val()));
                    }
                    if ($(this).parents("div.control").attr("id") == "control_3" || $(this).parents("div.control").attr("id") == "control_4") {
                        $(".show-sizeop .list-view li.type-2 p").text(LASCANA_SIZE_B.getSizeRelev($("#control_3 input").val(), $("#control_4 input").val()));
                    }
                }
            });
        });

        //btn event
        var prevInterval = 0, nextInterval = 0;
        $(".show-sizeop .control a").mousedown(function() {
            var obj = $(this);
            var extent = 5;
            var _index = obj.parents(".control").index() - 1;

            $(obj).attr('isDown', '1');

            var valueChange = function(obj) {
                if (obj.parents("div.control").attr("id") == "control_1" || obj.parents("div.control").attr("id") == "control_2") {
                    $(".show-sizeop .list-view li.type-1 p").text(LASCANA_SIZE_A.getSizeRelev($("#control_1 input").val(), $("#control_2 input").val()));
                }
                if (obj.parents("div.control").attr("id") == "control_3" || obj.parents("div.control").attr("id") == "control_4") {
                    $(".show-sizeop .list-view li.type-2 p").text(LASCANA_SIZE_B.getSizeRelev($("#control_3 input").val(), $("#control_4 input").val()));
                }
            }

            function actionPrev(obj) {
                var numPos = $(scrollClass).eq(_index).width() / 2;
                if ($(scrollClass).eq(_index).find("p").position().left > -centerline - parseInt($(scrollClass).eq(_index).attr("begin") / modulus)) {
                    $(scrollClass).eq(_index).find("p").css("left", ($(scrollClass).eq(_index).find("p").position().left - extent) + "px");
                }
                showValue($(scrollClass).eq(_index));
                bindScroll($(scrollClass).eq(_index));
                valueChange(obj);

                if ($.trim($(obj).attr('isDown')) == '1') {
                    prevInterval = setTimeout(function() { actionPrev(obj); }, 100);
                }
            }
            function actionNext(obj) {
                var numPos = $(scrollClass).eq(_index).width() / 2;
                if ($(scrollClass).eq(_index).find("p").position().left < centerline) {
                    $(scrollClass).eq(_index).find("p").css("left", ($(scrollClass).eq(_index).find("p").position().left + extent) + "px");
                }
                showValue($(scrollClass).eq(_index));
                bindScroll($(scrollClass).eq(_index));
                valueChange(obj);

                if ($.trim($(obj).attr('isDown')) == '1') {
                    nextInterval = setTimeout(function() { actionNext(obj); }, 100);
                }
            }

            if ($(this).hasClass("prev")) {
                actionPrev(obj);
            }
            else {
                actionNext(obj);
            }
        }).mouseup(function() {
            if (prevInterval) {
                clearTimeout(prevInterval);
                prevInterval = 0;
            }
            if (nextInterval) {
                clearTimeout(nextInterval);
                prevInterval = 0;
            }
        }).mouseout(function() {
            if (prevInterval) {
                clearTimeout(prevInterval);
                prevInterval = 0;
            }
            if (nextInterval) {
                clearTimeout(nextInterval);
                prevInterval = 0;
            }
        });

        //提示模块切换
        $(".show-sizeop .control, .show-sizeop .draggable").hover(
            function() {
                var _index = $(this).index();
                if ($(this).hasClass("draggable")) {
                    $(this).children().find("div").show();
                }
                else {
                    _index = _index - 1;
                }
                $(".show-sizebox .img-box .list-txt li").eq(_index).addClass("current").siblings().removeClass("current");
            },
            function() {
                if ($(this).hasClass("draggable")) {
                    $(this).children().find("div").hide();
                }
            });
    }
    showsizeFun();
});

//201307261346