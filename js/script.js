jQuery(function($){
    $('body').on('mouseenter', 'a', function(e) {
        var o = this;
        if (o.href != '#') {
            chrome.extension.sendRequest('show', function(r) {
                var uri = $.url.parse(o.href);
                if (r.istooltip) {
                    $(o).qtip({
                        overwrite: false,
                        content: {
                            text: uri.source.replace(uri.host, '<span style="color:' + r.domaincolor + '">' + uri.host + '</span>')
                        },
                        show: {
                            event: e.type,
                            ready: true,
                            delay: r.time
                        },
                        hide: {
                            fixed: true
                        },
                        position: {
                            my: 'top left',
                            target: 'mouse',
                            viewport: $(window),
                            adjust: {
                                y: +25
                            }
                        },
                        style: {
                            classes: 'qtip-dark',
                            tip: {
                                corner: false
                            }
                        }
                    }, e);
                } else {
                    $(o).qtip({
                        overwrite: false,
                        content: {
                            text: uri.source.replace(uri.host, '<span style="color:' + r.domaincolor + '">' + uri.host + '</span>')
                        },
                        show: {
                            event: e.type,
                            ready: true,
                            delay: r.time
                        },
                        hide: {
                            fixed: true
                        },
                        position: {
                            my: r.position,
                            at: r.position,
                            target: $(window),
                            adjust: {
                                y: ((r.position === 'left bottom') ? -20 : 0)
                            }
                        },
                        style: {
                            classes: 'qtip-dark',
                            tip: {
                                corner: false
                            }
                        }
                    }, e);
                }
            })
        }
    }).on('mouseleave', 'a', function(e){
        $(this).qtip('destroy');
    })
});