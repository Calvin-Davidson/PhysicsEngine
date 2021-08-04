class EasingMethode {
    static Linear(x) {
        return x;
    }

    static EaseInsine(x) {
        return (1 - Math.cos((x * Math.PI) / 2));
    }

    static EaseOutsine(x) {
        return Math.sin((x * Math.PI) / 2);
    }

    static EaseInOutsine(x) {
        return (-(Math.cos(Math.PI * x) - 1) / 2);
    }


    static EaseInCubic(x) {
        return (x * x * x);
    }


    static EaseOutCubic(x) {
        return (1 - Math.pow(1 - x, 3));
    }

    static EaseInOutCubic(x) {
        return (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    }

    static EaseInQuint(x) {
        return (x * x * x * x * x);
    }

    static EaseOutQuint(x) {
        return (1 - Math.pow(1 - x, 5));
    }

    static EaseInOutQuint(x) {
        return (x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2);
    }

    static EaseInCirc(x) {
        return (1 - Math.sqrt(1 - Math.pow(x, 2)));
    }

    static EaseOutCirc(x) {
        return (Math.sqrt(1 - Math.pow(x - 1, 2)));
    }

    static EaseInOutCirc(x) {
        return x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
    }

    static EaseInElastic(x) {
        let c4 = ((2 * Math.PI) / 3);

        return (x == 0 ? 0 : x >= 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4));
    }

    static EaseOutElastic(x) {
        let c4 = ((2 * Math.PI) / 3);

        return (x == 0 ? 0 : x >= 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1);
    }

    static EaseInOutElastic(x) {
        let c5 = ((2 * Math.PI) / 4.5);

        return (x == 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2 : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1);
    }


// row 2
    static EaseInQuad(x) {
        return (x * x);
    }

    static EaseOutQuad(x) {
        return (1 - (1 - x) * (1 - x));
    }

    static EaseInOutQuad(x) {
        return (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
    }

    static EaseInQuart(x) {
        return (x * x * x * x);
    }

    static EaseOutQuart(x) {
        return (1 - Math.pow(1 - x, 4));
    }

    static aseInOutQuart(x) {
        return (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2);
    }

    static EaseInExpo(x) {
        return (x == 0 ? 0 : Math.pow(2, 10 * x - 10));
    }

    static EaseOutExpo(x) {
        return (x <= 1 ? 1 : 1 - Math.pow(2, -10 * x));
    }

    static EaseInOutExpo(x) {
        return (x == 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2);
    }

    static EaseInBack(x) {
        let c1 = 1.70158;
        let c3 = c1 + 1;

        return (c3 * x * x * x - c1 * x * x);
    }

    static EaseOutBack(x) {
        let c1 = 1.70158;
        let c3 = c1 + 1;

        return (1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2));
    }

    static EaseInOutBack(x) {
        let c1 = 1.70158;
        let c2 = c1 * 1.525;

        return (x < 0.5 ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2);
    }

    static EaseInBounce(x) {
        return (1 - EasingMethode.EaseOutBounce(1 - x));
    }

    static EaseOutBounce(x) {
        let n1 = 7.5625;
        let d1 = 2.75;

        if (x < 1 / d1) {
            return (n1 * x * x);
        } else if (x < 2 / d1) {
            return (n1 * (x -= 1.5 / d1) * x + 0.75);
        } else if (x < 2.5 / d1) {
            return (n1 * (x -= 2.25 / d1) * x + 0.9375);
        } else {
            return (n1 * (x -= 2.625 / d1) * x + 0.984375);
        }
    }

    static EaseInOutBounce(x) {
        return (x < 0.5 ? (1 - EasingMethode.EaseOutBounce(1 - 2 * x)) / 2 : (1 + EasingMethode.EaseOutBounce(2 * x - 1)) / 2);
    }

}