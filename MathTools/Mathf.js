class Mathf {
    static Epsilon = 1.175494E-38;
    static Infinity = 1.0 / 0.0;
    static Deg2Rad = 0.01745329;
    static NegativeInfinity = -1.0 / 0.0;
    static PI = 3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342;
    static Rad2Deg = 57.29578;

    static Abs(value) {
        return Math.abs(value);
    }

    static Acos(value) {
        return Math.acos(value);
    }

    static Approximately(a, b) {
        return Mathf.Abs(b - a) < Mathf.Max(1E-06 * Mathf.Max(Mathf.Abs(a), Mathf.Abs(b)), Mathf.Epsilon * 8);
    }

    static Asin(value) {
        return Math.asin(value);
    }

    static Atan(value) {
        return Math.atan(value);
    }

    static Atan2(a, b) {
        return Math.atan2(a, b);
    }

    static Ceil(f) {
        return Math.ceil(f);
    }

    static Clamp(value, min, max) {
        if (value < min)
            value = min;
        else if (value > max)
            value = max;
        return value;
    }

    static Clamp01(value) {
        if (value < 0.0) {
            return 0.0;
        }
        if (value > 1.0) {
            return 1;
        } else {
            return value;
        }
    }

    static Cos(value) {
        return Math.cos(value);
    }

    static Exp(value) {
        return Math.exp(value);
    }

    static Floor(value) {
        return Math.floor(value);
    }

    static Lerp(a, b, t) {
        return a + (b - a) * Mathf.Clamp01(t);
    }

    static Max(a, b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }

    static Min(a, b) {
        if (a > b) {
            return b;
        } else {
            return a;
        }
    }

    static Pow(a, b) {
        return Math.pow(a, b);
    }

    static Repeat(t, length) {
        return Mathf.Clamp(t - Mathf.Floor(t / length) * length, 0.0, length);
    }

    static Round(value) {
        return Math.round(value);
    }

    static Sign(value) {
        return Math.sign(value);
    }

    static Sin(value) {
        return Math.sin(value);
    }

    static Sqrt(value) {
        return Math.sqrt(value);
    }

    static Tan(value) {
        return Math.tan(value);
    }

    static DeltaAngle(current, target) {
        let num = Mathf.Repeat(target - current, 360);
        if (num > 180.0) num -= 360;
        return num;
    }

    static InverseLerp(a, b, value) {
        return a !== b ? Mathf.Clamp01(((value - a) / (b - a))) : 0.0;
    }

    static LerpAngle(a, b, t) {
        let num = Mathf.Repeat(b - a, 360);
        if (num > 180.0)
            num -= 360;
        return a + num * Mathf.Clamp01(t);
    }

    static LerpUnclamped(a, b, t) {
        return a + (b - a) * t;
    }

    static MoveTowards(current, target, maxDelta) {
        return Mathf.Abs(target - current) <= maxDelta ? target : current + Mathf.Sign(target - current) * maxDelta;
    }

    static PingPong(t, length) {
        t = Mathf.Repeat(t, length * 2);
        return length - Mathf.Abs(t - length);
    }

    static SmoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
        smoothTime = Mathf.Max(0.0001, smoothTime);
        let num1 = 2 / smoothTime;
        let num2 = num1 * deltaTime;
        let num3 = (1.0 / (1.0 + num2 + 0.479999989271164 * num2 * num2 + 0.234999999403954 * num2 * num2 * num2));
        let num4 = current - target;
        let num5 = target;
        let max = maxSpeed * smoothTime;
        let num6 = Mathf.Clamp(num4, -max, max);
        target = current - num6;
        let num7 = (currentVelocity + num1 * num6) * deltaTime;
        let num8 = target + (num6 + num7) * num3;
        if (num5 - current > 0.0 === num8 > num5) {
            num8 = num5;
        }
        return num8;
    }


    static SmoothStep(from, to, t) {
        t = Mathf.Clamp01(t);
        t = (-2.0 * t * t * t + 3.0 * t * t);
        return (to * t + from * (1.0 - t));
    }


    static MoveTowardsAngle(current, target, maxDelta) {
        let num = Mathf.DeltaAngle(current, target);
        if (-maxDelta < num && num < maxDelta)
            return target;
        target = current + num;
        return Mathf.MoveTowards(current, target, maxDelta);
    }


    static SmoothDampAngle(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
        target = current + Mathf.DeltaAngle(current, target);
        return Mathf.SmoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
    }


    static DegreeToRadian(degree) {
        return degree * this.PI / 180;
    }

    static RadianToDegree(radian) {
        return radian * 180 / this.PI;
    }

    static random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static average(...values) {
        let v = 0;
        values.forEach(value => v += value);
        return v / values.length;
    }
}