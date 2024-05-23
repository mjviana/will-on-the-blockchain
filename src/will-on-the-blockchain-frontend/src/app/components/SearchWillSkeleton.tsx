"use client";

import {Card, Skeleton, CardBody, SkeletonText} from "@chakra-ui/react";

function SearchWillSkeleton() {
  return (
    <>
      <Card mb={5} mx={10} p={10}>
        <Skeleton />
        <CardBody>
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
        </CardBody>
      </Card>
      <Card mb={5} mx={10} p={10}>
        <Skeleton />
        <CardBody>
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
        </CardBody>
      </Card>
      <Card mb={5} mx={10} p={10}>
        <Skeleton />
        <CardBody>
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
        </CardBody>
      </Card>
    </>
  );
}

export default SearchWillSkeleton;
