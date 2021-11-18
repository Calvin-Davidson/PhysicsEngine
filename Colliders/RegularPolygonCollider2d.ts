// todo implement : https://www.codeproject.com/Articles/15573/2D-Polygon-Collision-Detection
// Structure that stores the results of the PolygonCollision function
class PolygonCollisionResult {
    public WillIntersect: boolean = true; // Are the polygons going to intersect forward in time?
    public Intersect: boolean = true; // Are the polygons currently intersecting
    public MinimumTranslationVector: Vector2 = new Vector2(0, 0); // The translation to apply to polygon A to push the polygons appart.
}

class RegularPolygonCollider2d {
    static RegularPolygonCircleCollision(poly: RegularPolygon, circle: Circle) {
        throw new Error("RegularPolygonCircleCollision" + " is not implemented")
    }

    static RegularPolygonCubeCollision(poly: RegularPolygon, cube: Cube) {
        throw new Error("RegularPolygonCubeCollision" + " is not implemented")
    }

    static RegularPolygonCollision(polygonA: RegularPolygon, polygonB: RegularPolygon) {
        function IntervalDistance(minA, maxA, minB, maxB) {
            if (minA < minB) {
                return minB - maxA;
            } else {
                return minA - maxB;
            }
        }

        function ProjectPolygon(axis, polygon) {
            let d = axis.dot(polygon.GetPoints()[0]);
            let min = d;
            let max = d;
            for (let i = 0; i < polygon.GetPoints().length; i++) {
                d = polygon.GetPoints()[i].dot(axis);
                if (d < min) {
                    min = d;
                } else {
                    if (d > max) {
                        max = d;
                    }
                }
            }
            return new Vector2(min, max);
        }

        let result = true;

        let edgeCountA = polygonA.GetEdges().length;
        let edgeCountB = polygonB.GetEdges().length;
        let edge;

        for (let edgeIndex = 0; edgeIndex < edgeCountA + edgeCountB; edgeIndex++) {
            if (edgeIndex < edgeCountA) {
                edge = polygonA.GetEdges()[edgeIndex];
            } else {
                edge = polygonB.GetEdges()[edgeIndex - edgeCountA];
            }

            let axis = new Vector2(-edge.y, edge.x);
            axis.normalize();

            let minMaxA = ProjectPolygon(axis, polygonA);
            let minMaxB = ProjectPolygon(axis, polygonB);

            if (IntervalDistance(minMaxA.x, minMaxA.y, minMaxB.x, minMaxB.y) > 0) {
                result = false;
                return result;
            }
        }
        return result;
    }
}