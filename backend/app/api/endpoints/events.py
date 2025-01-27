from fastapi import APIRouter

router = APIRouter()

@router.get('/events')
async def list_events():
    pass

@router.post('/events')
async def create_events():
    pass

@router.get('/events/{events_id}')
async def read_events():
    pass

@router.put('/events/{events_id}')
async def update_events():
    pass

@router.delete('/events/{events_id}')
async def delete_events():
    pass