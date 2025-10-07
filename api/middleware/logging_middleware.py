import logging
import time
import uuid

from fastapi import Request

logger = logging.getLogger(__name__)


async def log_request(request: Request, call_next):
    """Log request and response for api calls"""
    request_id = str(uuid.uuid4())

    log_data = {
        "request_id": request_id,
        "method": request.method,
        "path": request.url.path,
        "query_params": dict(request.query_params),
    }

    logger.info(f"Request Start: {log_data}")

    start_time = time.time()

    try:
        response = await call_next(request)
        process_time = time.time() - start_time

        log_data.update(
            {
                "status_code": response.status_code,
                "process_time": process_time,
            }
        )

        if response.status_code >= 500:
            logger.error(f"Request completed with server error: {log_data}")
        elif response.status_code >= 400:
            logger.warning(f"Request completed with client error: {log_data}")
        else:
            logger.info(f"Request completed successfully: {log_data}")

        return response
    except Exception as e:
        process_time = time.time() - start_time

        log_data.update(
            {
                "status_code": 500,
                "process_time": process_time,
            }
        )

        logger.error(f"Request Error: {log_data} - Error: {e}")
        raise
