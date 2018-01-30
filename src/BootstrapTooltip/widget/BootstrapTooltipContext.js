define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "BootstrapTooltip/widget/BootstrapTooltip"
], function (declare, lang, _bootstrapTooltipWidget) {
    "use strict";

    return declare("BootstrapTooltip.widget.BootstrapTooltipContext", [_bootstrapTooltipWidget], {

        update: function (obj, callback) {
			
	    this._contextObj = obj;
	    // 20180126 - Ivo Sturm - Added subscriptions to cater for listening to dataview refresh
	    this._resetSubscriptions();
			
            logger.debug(this.id + ".update");

            var guid = obj ? obj.getGuid() : null;
            if (this.tooltipMessageMicroflow !== "") {
                this._execMf(this.tooltipMessageMicroflow, guid, lang.hitch(this, function (string) {
                    this._tooltipText = string;
                    this._initializeTooltip();
                }));
            } else if (this.tooltipMessageString !== "") {
                this._tooltipText = this.tooltipMessageString;
                this._initializeTooltip();
            } else {
                this._initializeTooltip();
            }

            callback();
        },
	_resetSubscriptions: function () {

            if (this._contextObj && this._handles.length == 0) {

                var contextHandle = mx.data.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: lang.hitch(this, function (guid) {
			var guid = this._contextObj ? this._contextObj.getGuid() : null;
			if (this.tooltipMessageMicroflow !== "") {
				this._execMf(this.tooltipMessageMicroflow, guid, lang.hitch(this, function (string) {
					this._tooltipText = string;
					this._initializeTooltip();
				}));
			} else if (this.tooltipMessageString !== "") {
				this._tooltipText = this.tooltipMessageString;
				this._initializeTooltip();
			} else {
				this._initializeTooltip();
			}
                    })
                });
		this._handles.push(contextHandle);
            }
        }
    });
});

require(["BootstrapTooltip/widget/BootstrapTooltipContext"]);
