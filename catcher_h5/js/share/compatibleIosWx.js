var $body = $('body'),
            dialogIsInView = !1,//当前是不是对话框
            lastContentContainerScrollTop = -1,//用于弹出框禁止内容滚动
            $contentContainer = $('.container');//内容容器
    //阻止Window滚动
    function stopWindowScroll() {
        dialogIsInView = true;
        //禁止页面滚动
        lastContentContainerScrollTop = $body.scrollTop();
        $contentContainer.addClass('overflow-hidden').css({
            'height': $window.height(),
            'margin-top': -lastContentContainerScrollTop
        });
    }

    //恢复Window滚动
    function revertWindowScroll() {
        dialogIsInView = !1;
        //恢复页面滚动
        $contentContainer.css({
            'height': 'auto',
            'margin-top': 0
        }).removeClass('overflow-hidden');
        $body.scrollTop(lastContentContainerScrollTop);

    }