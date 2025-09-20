import Image from "next/image";
import { RouteId } from "../interfaces";
import styles from "./../../page.module.css";
import { getPathFromRouteId } from "../util";

interface ServiceBulletProps {
  routeId: RouteId;
}

export default function ServiceBullet(props: ServiceBulletProps) {
  return (
    <Image
      src={getPathFromRouteId(props.routeId)}
      className={styles.bracketMatchBullet}
      alt={props.routeId}
      width={50}
      height={50}
    />
  );
}
