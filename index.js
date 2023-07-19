/**
 * @file mofron-effect-slide/index.js
 * @brief position effect for mofron
 *        it implements movement animations to components.
 * @feature default animation speed is 300ms
 * @attention it may not work well if "position" was configured incorrectly.
 *            "position" is disabled if the target component was already set "position" css-style.
 * @license MIT
 */

module.exports = class extends mofron.class.Effect {
    /**
     * initialize effect
     *
     * @param (mixed) string: directionconfig  parameter
     *                        dict: effect config list
     * @param (string(size)) value parameter
     * @short dirction,value
     * @type private
     */
    constructor (p1,p2) {
        try {
            super();
            this.modname("Slide");
            this.shortForm("direction", "value");
            this.speed(300);
            
            /* init config */
            this.confmng().add(
	        "position",
                {
		    type: "string",
		    select: ["absolute", "fixed", "inherit", "initial", "relative", "static", "sticky", "unset"],
		    init: "relative"
		}
            );
	    this.confmng().add("direction", { type: "string", select: ["top", "left", "bottom", "right"]});
	    this.direction('left');
            this.confmng().add("value", { type: "size" });
            this.confmng().add("initValue", { type: "size", init:"0rem" });
            
            this.beforeEvent(
                (eff) => {
                    try {
                        eff.component().style({ 'position': eff.position() });
                        let dir     = eff.direction();
                        let set_dir = {};
                        if (('left' === dir) || ('right' === dir)) {
                            set_dir = { 'left':eff.initValue() };
                        } else {
                            set_dir = { 'top':eff.initValue() };
                        }
		        eff.component().style(set_dir);
		    } catch (e) {
                        console.error(e.stack);
                        throw e;
		    }
		}
	    );

            /* set config */
	    if (0 < arguments.length) {
                this.config(p1,p2);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * effect contents
     * set end position
     * 
     * @param (object) effect target component
     * @type private
     */
    contents (cmp) {
        try {
	    let dir = this.direction();
	    if ('left' === dir) {
	        cmp.style({ 'left': '-'+this.value() });
	    } else if ('right' === dir) {
                cmp.style({ 'left': this.value() });
            } else if ('top' === dir) {
                cmp.style({ 'top': '-'+this.value() });
            } else {
                cmp.style({ 'top': this.value() });
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * position type setter/getter
     * value of "position" style
     *
     * @param (string) position type, the default is "relative"
     *                 ["absolute"/"fixed"/"inherit"/"initial"/"relative"/"static"/"sticky"/"unset"]
     * @return (string) position type
     * @type parameter
     */
    position (prm) {
        try {
	    return this.confmng("position", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * direction type
     *
     * @param (string) direction type, the default is "left"
     *                 ["top"/"left"/"bottom"/"right"]
     * @return (string) direction type
     * @type parameter
     */
    direction (prm) {
        try {
	    if ('string' === typeof prm) {
                if (('left' === prm) || ('right' === prm)) {
                    this.transition('left');
		} else {
                    this.transition('top');
		}
	    }
            return this.confmng("direction", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * position value
     * component position is moved by this value size
     * 
     * @param (string) begin position value, default is "0rem"
     * @param (string) end position value, default is "0rem"
     * @return (string) position value
     * @type parameter
     */
    value (prm) {
        try {
	    return this.confmng("value", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    initValue (prm) {
        try {
            return this.confmng("initValue", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
