jQuery(function($){
    $('body').on('mouseenter', 'a', function(e) {
        var o = this;
        if ( o.href != '#' ) {
            chrome.extension.sendRequest('show', function(r) {
                var uri = $.url.parse(o.href),
                    position,
                    text = uri.source.replace(uri.host, '<span style="color:' + r.domaincolor + '">' + uri.host + '</span>');
                // Check if is a tooltip or not
                if (r.istooltip) {
                    position = {
                        my: 'top left',
                        target: 'mouse',
                        viewport: $(window),
                        adjust: {
                            y: +25
                        }
                    }
                } else {
                    position = {
                        my: r.position,
                        at: r.position,
                        target: $(window),
                        adjust: {
                            y: ( r.position === 'left bottom' ? -20 : 0 )
                        }
                    }
                }
                // Is the target a new window?
                if ( $(o).attr('target') == '_blank' ) text = '<i class="fa fa-external-link-square" style="padding-right: 5px;"></i>' + text;
                // Show the qtip
                $(o).qtip({
                    overwrite: false,
                    content: {
                        text: text
                    },
                    show: {
                        event: e.type,
                        ready: true,
                        delay: r.time
                    },
                    hide: {
                        fixed: true
                    },
                    position: position,
                    style: {
                        classes: 'qtip-dark',
                        tip: {
                            corner: false
                        }
                    }
                }, e);
            })
        }
    }).on('mouseleave', 'a', function(e){
        $(this).qtip('destroy');
    })
});